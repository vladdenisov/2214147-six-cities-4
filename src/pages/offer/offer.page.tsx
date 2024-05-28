import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SendCommentForm } from '../../components/send-comment-form/send-comment-form';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Rating } from '../../components/rating/rating';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import {Map} from '../../components/map/map';
import { Point, Review } from '../../types';
import { Card } from '../../components/card/card';
import { OfferGallery } from '../../components/offer-gallery/offer-gallery';
import { useGetOfferData, useMutation } from '../../hooks';
import { Spinner } from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../store/helpers';
import { selectAuthorizationStatus } from '../../store/user/user.store';
import { AuthorizationStatus, ROUTE_PATHS } from '../../const';
import { changeOfferFavoriteStatus } from '../../store/action';


export const OfferPage: FC = () => {
  const { id } = useParams();

  const {offerData: offer, reviewsData, nearbyOffersData, isLoading, addReview, changeOfferIsFavorite} = useGetOfferData({ id: id ?? '' });

  const authStatus = useAppSelector(selectAuthorizationStatus);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [activePoint, setActivePoint] = useState<Point>();

  const [isOfferInFavorites, setIsOfferInFavorites] = useState<boolean>(offer?.isFavorite ?? false);

  useEffect(() => {
    setIsOfferInFavorites(offer?.isFavorite ?? false);
  }, [offer?.isFavorite]);

  const points = useMemo<Point[]>(
    () =>
      nearbyOffersData?.map((item) => ({
        id: item.id,
        latitude: item.location.latitude,
        longitude: item.location.longitude,
        zoom: item.location.zoom,
      })) ?? [],
    [nearbyOffersData]
  );

  const handleCardMouseEnter = useCallback((placeId: string) => {
    const point = points.find((p) => p.id === placeId);
    if (point) {
      setActivePoint(point);
    }
  }, [points]);

  const handleCardMouseLeave = useCallback(() => {
    setActivePoint(undefined);
  }, []);

  const handleFavoriteClick = useCallback(() => {
    if (authStatus !== AuthorizationStatus.LOGGINED) {
      navigate(ROUTE_PATHS.LOGIN);
      return;
    }
    dispatch(changeOfferFavoriteStatus({id: id ?? '', status: !isOfferInFavorites})).then((result) => {
      setIsOfferInFavorites(result.payload as boolean);
    });
  }, [authStatus, dispatch, id, isOfferInFavorites, navigate]);

  const handleNearbyOfferFavoriteClick = useCallback((nearbyOfferId: string, status: boolean) => {
    dispatch(changeOfferFavoriteStatus({id: nearbyOfferId, status})).then((result) => {
      changeOfferIsFavorite?.(nearbyOfferId, result.payload as boolean);
    });
  }, [dispatch, changeOfferIsFavorite]);

  const [mutate, {loading: isOfferMutationLoading}] = useMutation<Review>(`/comments/${id}`, 'POST', {
    onSuccess: (data) => {
      addReview(data);
    },
  });

  if (isLoading) {
    return (
      <Spinner withPageWrapper />
    );
  }

  if (!offer && !isLoading) {
    return <Navigate to="/not-found" />;
  }

  if (!offer) {
    return null;
  }

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <OfferGallery images={offer.images} alt={offer.title} />
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {offer?.isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{offer?.title}</h1>
              <button
                className={`offer__bookmark-button button ${
                  isOfferInFavorites ? 'offer__bookmark-button--active' : ''
                }`}
                type="button"
                onClick={() => {
                  handleFavoriteClick();
                }}
              >
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                {isOfferInFavorites ? (
                  <span className="visually-hidden">In bookmarks</span>
                ) : (
                  <span className="visually-hidden">To bookmarks</span>
                )}
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <Rating value={offer?.rating || 0} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">
                {offer?.rating}
              </span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {offer?.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer?.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                  Max {offer?.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{offer?.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {offer?.goods.map((good) => (
                  <li key={good} className="offer__inside-item">
                    {good}
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="offer__avatar user__avatar"
                    src={offer?.host.avatarUrl}
                    width="74"
                    height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{offer?.host.name}</span>
                {offer?.host.isPro && (
                  <span className="offer__user-status">Pro</span>
                )}
              </div>
              <div className="offer__description">
                {offer?.description.split('.').map((text) => (
                  <p className="offer__text" key={`Offer-${text}`}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
            <section className="offer__reviews reviews">
              <ReviewsList reviews={reviewsData} />
              {
                authStatus === AuthorizationStatus.LOGGINED && (
                  <SendCommentForm
                    onSend={(comment) => {
                      mutate(JSON.stringify(comment));
                    }}
                    isLoading={isOfferMutationLoading}
                  />
                )
              }
            </section>
          </div>
        </div>
      </section>
      {
        nearbyOffersData && nearbyOffersData.length > 0 && (
          <div className="container">
            <section className="near-places places">
              <Map city={offer.city} points={points} selectedPoint={activePoint} className='offer__map' />
              <h2 className="near-places__title">
              Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {nearbyOffersData.map((item) => (
                  <Card
                    key={item.id}
                    prefix={'near-places'}
                    onMouseEnter={() => handleCardMouseEnter(item.id)}
                    onMouseLeave={handleCardMouseLeave}
                    {...item}
                    onFavoriteClick={handleNearbyOfferFavoriteClick}
                  />
                ))}
              </div>
            </section>
          </div>
        )
      }
    </main>
  );
};

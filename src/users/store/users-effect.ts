import { CardMemberRequest, UlmaxCard, UlmaxFullCard } from '@ulmax/frontend';
import Fetch from 'src/fetch';
import { RootState, ThunkedAction } from 'src/store';
import {
  AwaitMap,
  awaitTo,
  LocalStatusAction,
  localStatusAction,
} from 'src/util';
import { userActions } from './users-slice';
import { AuthorizedUserCard } from './users-util';

/**
 * request to get all card members
 */
export function retriveCardMembers({
  onError,
  onSuccess,
}: LocalStatusAction<UlmaxFullCard[]>): ThunkedAction {
  return async function(dispatch, getState) {
    dispatch(userActions.loading());
    const response = await awaitTo(
      Fetch.GET<UlmaxFullCard[]>(
        `cardnode/cards/${currentCardNo(getState())}/members`,
      ),
    );
    localStatusAction(response, {
      onSuccess: members => dispatch(userActions.batchUpsertMember(members)),
      onError: error => dispatch(userActions.error(error)),
    });
    localStatusAction(response, {
      onError,
      onSuccess,
    });
  };
}

/**
 * interface to request for the principal
 * user after signup
 */
export interface RequestCard extends LocalStatusAction<UlmaxFullCard> {
  biodatas: CardMemberRequest;
}

/**
 * request to create an ulmax full card
 * for the first principal user
 */
export function requestPrincipalCard(req: RequestCard): ThunkedAction {
  return async function(dispatch) {
    dispatch(userActions.loading());
    const response = await awaitTo(
      Fetch.POST<UlmaxFullCard, CardMemberRequest>(
        `cardnode/admin/request/primarycard`,
        req.biodatas,
      ),
    );
    memberUpdateActions(dispatch, response)(req);
  };
}

/** select the current user card no */
const currentCardNo = (state: RootState) =>
  AuthorizedUserCard(state)?.card.cardNo;

/**
 * dispatch actions that alter's the getState
 * and update members informations
 */
const memberUpdateActions = (
  dispatch: Function,
  response: AwaitMap<UlmaxFullCard>,
) => ({ onSuccess, onError }: LocalStatusAction<UlmaxFullCard>) => {
  localStatusAction(response, {
    onSuccess: val => dispatch(userActions.upsertMember(val)),
    onError: error => dispatch(userActions.error(error)),
  });
  localStatusAction(response, {
    onError,
    onSuccess,
  });
};

/**
 * dispatch actions to create a new member
 */
export function addCardMember(req: RequestCard): ThunkedAction {
  return async function(dispatch, getState) {
    dispatch(userActions.loading());
    const response = await awaitTo(
      Fetch.POST<UlmaxFullCard, CardMemberRequest>(
        `cardnode/cards/${currentCardNo(getState())}/members`,
        req.biodatas,
      ),
    );
    memberUpdateActions(dispatch, response)(req);
  };
}

/**
 * dispatch actions to update them member full card
 */
export function updateCardMember(
  cardId: string,
  req: RequestCard,
): ThunkedAction {
  return async function(dispatch, getState) {
    dispatch(userActions.loading());
    const response = await awaitTo(
      Fetch.PUT<UlmaxFullCard, CardMemberRequest>(
        `cardnode/cards/${currentCardNo(getState())}/members/${cardId}`,
        req.biodatas,
      ),
    );
    memberUpdateActions(dispatch, response)(req);
  };
}

// Deleted the card response
type DeletedCardResponse = { status: boolean; card: UlmaxCard };

// options to delete a card member
type DeleteCardMember = {
  cardIdToRemove: string;
} & LocalStatusAction<DeletedCardResponse>;

/**
 * deletes a particular card member
 */
export function deleteCardMember({
  cardIdToRemove,
  onError,
  onSuccess,
}: DeleteCardMember): ThunkedAction {
  return async function(dispatch, getState) {
    const response = await awaitTo(
      Fetch.Delete<DeletedCardResponse>(
        `/cards/${currentCardNo(getState())}/members/${cardIdToRemove}`,
      ),
    );
    localStatusAction(response, {
      onSuccess: val => dispatch(userActions.removeMember(val.card.id)),
      onError: error => dispatch(userActions.error(error)),
    });
    localStatusAction(response, {
      onError,
      onSuccess,
    });
  };
}

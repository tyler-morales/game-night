/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMember = /* GraphQL */ `
  mutation CreateMember(
    $input: CreateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    createMember(input: $input, condition: $condition) {
      id
      name
      owner
      type
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const updateMember = /* GraphQL */ `
  mutation UpdateMember(
    $input: UpdateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    updateMember(input: $input, condition: $condition) {
      id
      name
      owner
      type
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const deleteMember = /* GraphQL */ `
  mutation DeleteMember(
    $input: DeleteMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    deleteMember(input: $input, condition: $condition) {
      id
      name
      owner
      type
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const createGames = /* GraphQL */ `
  mutation CreateGames(
    $input: CreateGamesInput!
    $condition: ModelGamesConditionInput
  ) {
    createGames(input: $input, condition: $condition) {
      id
      name
      wins
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateGames = /* GraphQL */ `
  mutation UpdateGames(
    $input: UpdateGamesInput!
    $condition: ModelGamesConditionInput
  ) {
    updateGames(input: $input, condition: $condition) {
      id
      name
      wins
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteGames = /* GraphQL */ `
  mutation DeleteGames(
    $input: DeleteGamesInput!
    $condition: ModelGamesConditionInput
  ) {
    deleteGames(input: $input, condition: $condition) {
      id
      name
      wins
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createRecordGame = /* GraphQL */ `
  mutation CreateRecordGame(
    $input: CreateRecordGameInput!
    $condition: ModelRecordGameConditionInput
  ) {
    createRecordGame(input: $input, condition: $condition) {
      id
      name
      players
      winners
      owner
      type
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const updateRecordGame = /* GraphQL */ `
  mutation UpdateRecordGame(
    $input: UpdateRecordGameInput!
    $condition: ModelRecordGameConditionInput
  ) {
    updateRecordGame(input: $input, condition: $condition) {
      id
      name
      players
      winners
      owner
      type
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const deleteRecordGame = /* GraphQL */ `
  mutation DeleteRecordGame(
    $input: DeleteRecordGameInput!
    $condition: ModelRecordGameConditionInput
  ) {
    deleteRecordGame(input: $input, condition: $condition) {
      id
      name
      players
      winners
      owner
      type
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;

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
      updatedAt
      wins {
        items {
          id
          gameId
          name
          wins
          owner
          type
          createdAt
          updatedAt
        }
        nextToken
      }
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
      updatedAt
      wins {
        items {
          id
          gameId
          name
          wins
          owner
          type
          createdAt
          updatedAt
        }
        nextToken
      }
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
      updatedAt
      wins {
        items {
          id
          gameId
          name
          wins
          owner
          type
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createWin = /* GraphQL */ `
  mutation CreateWin(
    $input: CreateWinInput!
    $condition: ModelWinConditionInput
  ) {
    createWin(input: $input, condition: $condition) {
      id
      gameId
      name
      wins
      owner
      type
      createdAt
      updatedAt
      member {
        id
        name
        owner
        type
        createdAt
        updatedAt
        wins {
          nextToken
        }
      }
    }
  }
`;
export const updateWin = /* GraphQL */ `
  mutation UpdateWin(
    $input: UpdateWinInput!
    $condition: ModelWinConditionInput
  ) {
    updateWin(input: $input, condition: $condition) {
      id
      gameId
      name
      wins
      owner
      type
      createdAt
      updatedAt
      member {
        id
        name
        owner
        type
        createdAt
        updatedAt
        wins {
          nextToken
        }
      }
    }
  }
`;
export const deleteWin = /* GraphQL */ `
  mutation DeleteWin(
    $input: DeleteWinInput!
    $condition: ModelWinConditionInput
  ) {
    deleteWin(input: $input, condition: $condition) {
      id
      gameId
      name
      wins
      owner
      type
      createdAt
      updatedAt
      member {
        id
        name
        owner
        type
        createdAt
        updatedAt
        wins {
          nextToken
        }
      }
    }
  }
`;
export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
      id
      name
      owner
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
      id
      name
      owner
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
      id
      name
      owner
      type
      createdAt
      updatedAt
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
      updatedAt
    }
  }
`;

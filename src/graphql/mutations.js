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
      Plays {
        items {
          id
          gameId
          name
          wins
          loses
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
      Plays {
        items {
          id
          gameId
          name
          wins
          loses
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
      Plays {
        items {
          id
          gameId
          name
          wins
          loses
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
export const createPlay = /* GraphQL */ `
  mutation CreatePlay(
    $input: CreatePlayInput!
    $condition: ModelPlayConditionInput
  ) {
    createPlay(input: $input, condition: $condition) {
      id
      gameId
      name
      wins
      loses
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
        Plays {
          nextToken
        }
      }
    }
  }
`;
export const updatePlay = /* GraphQL */ `
  mutation UpdatePlay(
    $input: UpdatePlayInput!
    $condition: ModelPlayConditionInput
  ) {
    updatePlay(input: $input, condition: $condition) {
      id
      gameId
      name
      wins
      loses
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
        Plays {
          nextToken
        }
      }
    }
  }
`;
export const deletePlay = /* GraphQL */ `
  mutation DeletePlay(
    $input: DeletePlayInput!
    $condition: ModelPlayConditionInput
  ) {
    deletePlay(input: $input, condition: $condition) {
      id
      gameId
      name
      wins
      loses
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
        Plays {
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

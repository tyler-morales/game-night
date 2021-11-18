/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMember = /* GraphQL */ `
  query GetMember($id: ID!) {
    getMember(id: $id) {
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
          winRatio
          totalPlays
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
export const listMembers = /* GraphQL */ `
  query ListMembers(
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const membersByDate = /* GraphQL */ `
  query MembersByDate(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    membersByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getPlay = /* GraphQL */ `
  query GetPlay($id: ID!) {
    getPlay(id: $id) {
      id
      gameId
      name
      wins
      loses
      winRatio
      totalPlays
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
export const listPlays = /* GraphQL */ `
  query ListPlays(
    $filter: ModelPlayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlays(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        gameId
        name
        wins
        loses
        winRatio
        totalPlays
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
        }
      }
      nextToken
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      name
      owner
      type
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        owner
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gamesByDate = /* GraphQL */ `
  query GamesByDate(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gamesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        owner
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRecordGame = /* GraphQL */ `
  query GetRecordGame($id: ID!) {
    getRecordGame(id: $id) {
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
export const listRecordGames = /* GraphQL */ `
  query ListRecordGames(
    $filter: ModelRecordGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        players
        winners
        owner
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const recordGamesByDate = /* GraphQL */ `
  query RecordGamesByDate(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRecordGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    recordGamesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        players
        winners
        owner
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

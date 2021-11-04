/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMember = /* GraphQL */ `
  subscription OnCreateMember {
    onCreateMember {
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
export const onUpdateMember = /* GraphQL */ `
  subscription OnUpdateMember {
    onUpdateMember {
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
export const onDeleteMember = /* GraphQL */ `
  subscription OnDeleteMember {
    onDeleteMember {
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
export const onCreatePlay = /* GraphQL */ `
  subscription OnCreatePlay {
    onCreatePlay {
      id
      gameId
      name
      wins
      loses
      winRatio
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
export const onUpdatePlay = /* GraphQL */ `
  subscription OnUpdatePlay {
    onUpdatePlay {
      id
      gameId
      name
      wins
      loses
      winRatio
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
export const onDeletePlay = /* GraphQL */ `
  subscription OnDeletePlay {
    onDeletePlay {
      id
      gameId
      name
      wins
      loses
      winRatio
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
      id
      name
      owner
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
      id
      name
      owner
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
      id
      name
      owner
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRecordGame = /* GraphQL */ `
  subscription OnCreateRecordGame {
    onCreateRecordGame {
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
export const onUpdateRecordGame = /* GraphQL */ `
  subscription OnUpdateRecordGame {
    onUpdateRecordGame {
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
export const onDeleteRecordGame = /* GraphQL */ `
  subscription OnDeleteRecordGame {
    onDeleteRecordGame {
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

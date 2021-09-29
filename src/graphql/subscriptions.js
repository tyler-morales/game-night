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
      wins {
        items {
          id
          gameID
          name
          wins
          createdAt
          updatedAt
          owner
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
      wins {
        items {
          id
          gameID
          name
          wins
          createdAt
          updatedAt
          owner
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
      wins {
        items {
          id
          gameID
          name
          wins
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const onCreateWin = /* GraphQL */ `
  subscription OnCreateWin {
    onCreateWin {
      id
      gameID
      name
      wins
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
      owner
    }
  }
`;
export const onUpdateWin = /* GraphQL */ `
  subscription OnUpdateWin {
    onUpdateWin {
      id
      gameID
      name
      wins
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
      owner
    }
  }
`;
export const onDeleteWin = /* GraphQL */ `
  subscription OnDeleteWin {
    onDeleteWin {
      id
      gameID
      name
      wins
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
      owner
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

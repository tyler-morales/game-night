import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type MemberMetaData = {
  readOnlyFields: 'updatedAt';
}

type GamesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RecordGameMetaData = {
  readOnlyFields: 'updatedAt';
}

export declare class Member {
  readonly id: string;
  readonly name: string;
  readonly owner: string;
  readonly type: string;
  readonly createdAt: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Member, MemberMetaData>);
  static copyOf(source: Member, mutator: (draft: MutableModel<Member, MemberMetaData>) => MutableModel<Member, MemberMetaData> | void): Member;
}

export declare class Games {
  readonly id: string;
  readonly name: string;
  readonly wins: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Games, GamesMetaData>);
  static copyOf(source: Games, mutator: (draft: MutableModel<Games, GamesMetaData>) => MutableModel<Games, GamesMetaData> | void): Games;
}

export declare class RecordGame {
  readonly id: string;
  readonly name: string;
  readonly players?: string[];
  readonly winners?: string[];
  readonly owner: string;
  readonly type: string;
  readonly createdAt: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<RecordGame, RecordGameMetaData>);
  static copyOf(source: RecordGame, mutator: (draft: MutableModel<RecordGame, RecordGameMetaData>) => MutableModel<RecordGame, RecordGameMetaData> | void): RecordGame;
}
// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Member, Win, Game, RecordGame } = initSchema(schema);

export {
  Member,
  Win,
  Game,
  RecordGame
};
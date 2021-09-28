// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Member, Game, RecordGame } = initSchema(schema);

export {
  Member,
  Game,
  RecordGame
};
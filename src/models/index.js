// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Member, Games, RecordGame } = initSchema(schema);

export {
  Member,
  Games,
  RecordGame
};
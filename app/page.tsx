import { getPersons } from '@/features/person/actions/person_actions';
import { getAllPersons } from '@/features/person/actions/person_actons_net';
import Person from '@/features/person/components/person-inmemory-actions';

const Home = async () => {
  // uncomment for in memory
  // const persons = await getPersons();
  const persons = await getAllPersons();
  console.log(persons);
  return <Person persons={persons}></Person>;
};

export default Home;

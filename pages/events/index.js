import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../helpers/api-util";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";

function AllEventsPage(props) {
  const router = useRouter();
  const allEvents = props.events;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: { events },
    revalidate: 60,
  };
}
export default AllEventsPage;

import { createConsumer } from "@rails/actioncable";

const consumer = createConsumer();

const subscribeToRoomsListChannel = () => {
    consumer.subscriptions.create({ channel: "RoomsListChannel" }, {
        received(data) {
            //update store with data...
            
        }
    })
}

export default subscribeToRoomsListChannel;
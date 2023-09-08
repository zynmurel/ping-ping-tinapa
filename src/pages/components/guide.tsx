import { Timeline } from "antd";

const GuideCard = () => {
  return (
    <div className=" max-h-96 overflow-scroll pt-2">
      <Timeline
        items={[
          {
            color: "#2d81f7",
            children: (
              <div className=" flex flex-col ">
                <span className=" text-base font-semibold">
                  Step 1: Sign In or Create an Account
                </span>
                <span>1.) Open the Ping Ping app on your device.</span>
                <span>
                  2.) On the app's welcome screen, you'll have the option to
                  sign in using your Google or Facebook account for a quick and
                  easy login. Alternatively, if you don't have an account yet,
                  you can create one by providing your email, creating a
                  password, and filling in any necessary personal information.
                </span>
              </div>
            ),
          },
          {
            color: "#2d81f7",
            children: (
              <div className=" flex flex-col">
                <span className=" text-base font-semibold">
                  Step 2: Access the Customer Page
                </span>
                <span>
                  1.) Once you are logged in, you'll be directed to the app's
                  home or main page.{" "}
                </span>
                <span>
                  2.) This is where you can view the available menu items.
                </span>
              </div>
            ),
          },
          {
            color: "#2d81f7",
            children: (
              <div className=" flex flex-col">
                <span className=" text-base font-semibold">
                  Step 3: Select Your Orders
                </span>
                <span>
                  1.) In the Customer Page or Menu section, you'll find a list
                  of available food items or products offered by Ping Ping.
                  Browse through the menu, and when you find items you'd like to
                  order, tap on them to add them to your cart.
                </span>
                <span>
                  2.) You can adjust the quantity of products you want to order.
                </span>
              </div>
            ),
          },
          {
            color: "#2d81f7",
            children: (
              <div className=" flex flex-col">
                <span className=" text-base font-semibold">
                  Step 4: Place Your Order
                </span>
                <span>
                  1.) After you've added all the items you want to your cart,
                  review your order to ensure everything is correct.
                </span>
                <span>
                  2.) Once you are satisfied with your order, tap a button
                  "Place Order" .
                </span>
              </div>
            ),
          },
          {
            color: "#2d81f7",
            children: (
              <div className=" flex flex-col">
                <span className=" text-base font-semibold">
                  Step 5: Confirmation and Pending Order
                </span>
                <span>
                  1.) Your order will now be in a "Pending" status. This means
                  the Ping Ping store has received your order request but has
                  not yet processed it.
                </span>
                <span>
                  2.) You can view your order status in the My Orders page.
                </span>
              </div>
            ),
          },
          {
            color: "green",
            children: (
              <div className=" flex flex-col">
                <span className=" text-base font-semibold">
                  Step 6: Order Status Updates and Delivery
                </span>
                <span>
                  1.) Ping Ping delivery team will use the phone number you
                  provided during the order process to call and confirm your
                  delivery details.
                </span>
                <span>
                  2.) Enjoy your delicious tinapa from Ping Ping, delivered
                  right to your doorstep!
                </span>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default GuideCard;

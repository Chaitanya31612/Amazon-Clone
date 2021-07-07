import moment from "moment";

const Order = ({ order }) => {
  return (
    <div className='relative border rounded-md'>
      <div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>
        <div>
          <p className='font-bold text-xs uppercase'>Order Placed</p>
          <p>{moment.unix(order.timestamp).format("DD MMM YYYY")}</p>
        </div>

        <div>
          <p className='font-bold text-xs uppercase'>Total</p>
          <p>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(order.amount)}
          </p>
        </div>

        <p className='text-blue-500 text-right flex-1 self-end text-sm sm:text-lg whitespace-nowrap'>
          {order.items.length} items
        </p>
      </div>

      <div className='p-5 sm:p-10'>
        <div className='flex space-x-2 overflow-x-auto'>
          {order.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=''
              className='h-20 object-contain sm:h-32'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;

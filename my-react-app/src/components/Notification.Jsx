
const Notification = ({ showNotification }) => {
  return (
    <div>
      {showNotification && <p>Você tem novas mensagens!</p>}
    </div>
  );
};

export default Notification;
          
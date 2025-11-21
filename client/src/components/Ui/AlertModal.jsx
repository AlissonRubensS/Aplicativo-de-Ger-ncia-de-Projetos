function AlertModal({
  title,
  body,
  neg_opt,
  pos_opt,
  func,
  isVisible,
  setVisible,
  style = "pop-up",
}) {
  const bnt_style = style === "waring" ? "bnt-red" : "bnt-blue";

  return (
    isVisible && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-screen min-h-screen overflow-auto">
        <div className="card flex flex-col space-y-4 text-sm">
          <div className="flex flex-col gap-1 justify-center">
            <h1>{title}</h1>
            <p>{body}</p>
          </div>
          <div className="flex flex-row gap-1 justify-end">
            <button onClick={() => setVisible(false)} className="bnt">
              {neg_opt}
            </button>
            <button onClick={func} className={bnt_style}>
              {pos_opt}
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default AlertModal;

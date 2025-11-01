import './loader.css';

export default function Loading() {
  return (
    <>
      <style>{`
        body.light {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: hsl(var(--background));
        }
      `}</style>
      <div className="main">
        <div className="loaders">
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
        </div>
        <div className="loadersB">
            <div className="loaderA"><div className="ball0"></div></div>
            <div className="loaderA"><div className="ball1"></div></div>
            <div className="loaderA"><div className="ball2"></div></div>
            <div className="loaderA"><div className="ball3"></div></div>
            <div className="loaderA"><div className="ball4"></div></div>
            <div className="loaderA"><div className="ball5"></div></div>
            <div className="loaderA"><div className="ball6"></div></div>
            <div className="loaderA"><div className="ball7"></div></div>
            <div className="loaderA"><div className="ball8"></div></div>
            <div className="loaderA"><div className="ball9"></div></div>
        </div>
      </div>
    </>
  );
}

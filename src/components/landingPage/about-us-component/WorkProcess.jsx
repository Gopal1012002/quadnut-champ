import chat from "../../../assets/img/landing-page/chat.svg";
import monitor from "../../../assets/img/landing-page/monitor.svg";
import research from "../../../assets/img/landing-page/research.svg";
import trasparency from "../../../assets/img/landing-page/trasparency.svg";

function WorkProcess() {
  return (
    <>
      <section className="py-5 p-sm-5 bg-blue">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 ">
              <h3 className="text-center mt-3 mb-5">
              Why Choose QUADNUT?
              </h3>
            </div>
            <div className="  col-md-6 col-xl-3 mt-3 mt-xl-0">
              <div className="card py-5 card-box ">
                <div className="card-body text-center p-0 ">
                  <img
                    src={research}
                    alt="research"
                    className="img-fluid card-img pb-4"
                  />
                  <h4 className="lh-base text-center">
                  Customized <br /> Learning 
                  </h4>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-3 mt-3 mt-xl-0">
              <div className="card py-5 card-box">
                <div className="card-body text-center p-0">
                  <img
                    src={chat}
                    alt="Chat"
                    className="img-fluid  card-img pb-4"
                  />
                  <h4 className="text-center lh-base">
                  Industry-Driven <br />Curriculum
                  </h4>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-3 mt-3 mt-xl-0">
              <div className="card py-5  card-box">
                <div className="card-body text-center p-0">
                  <img
                    src={monitor}
                    alt="Monitor"
                    className="img-fluid  card-img pb-4"
                  />
                  <h4 className="text-center lh-base">
                  Comprehensive <br />Training Approach
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3 mt-3 mt-xl-0">
              <div className="card py-5  card-box">
                <div className="card-body text-center p-0">
                  <img
                    src={trasparency}
                    alt="Trasparency"
                    className="img-fluid  card-img pb-4"
                  />
                  <h4 className="text-center lh-base">
                  Extensive Training <br /> Prospects
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WorkProcess;

import React from 'react'
import play from "../../assets/img/icon/play.svg";
import icon01 from "../../assets/img/icon/icon-01.svg";
import icon02 from "../../assets/img/icon/icon-02.svg";
import { minuteToHrs } from "../../utils/dynamic.util";

const InstructorProfile = ({instructorData}) => {
  return (<>
  <div class="col-xl-9 col-lg-9">
                <div class="settings-widget card-details mb-0">
                  <div class="settings-menu p-0">
                    <div class="profile-heading">
                      <h3>
                        {" "}
                        {instructorData?.name} -{" "}
                        <span className="instructor-title">
                          {" "}
                          {instructorData?.instructorTitle}{" "}
                        </span>{" "}
                      </h3>
                    </div>
                    <div class="checkout-form personal-address">
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="contact-info">
                            <h6>
                              {" "}
                              <img src={play} alt="Img" />{" "}
                              {instructorData?.courseCount} + Courses
                            </h6>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="contact-info">
                            <h6>
                              {" "}
                              <img src={icon01} alt="Img" />{" "}
                              {instructorData?.lessonCount}+ Lesson
                            </h6>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="contact-info">
                            <h6>
                              {" "}
                              <img src={icon02} alt="Img" />{" "}
                              {minuteToHrs(instructorData?.lessonDuration)}{" "}
                            </h6>
                          </div>
                        </div>
                        <div class="col-sm-12">
                          <div class="contact-info mb-0">
                            <h6>About</h6>
                            <p className="mt-2"> {instructorData?.about}</p>
                            <h6 className="mt-4"> Experience </h6>
                            <ul className="experience-list">
                              {instructorData?.experience &&
                                JSON.parse(instructorData?.experience)?.map(
                                  (exp, index) => (
                                    <li className="experience-item" key={index}>
                                      <span className="experience-icon">✔</span>
                                      {exp}
                                    </li>
                                  )
                                )}
                            </ul>
                            <h6 className="mt-4"> Education </h6>
                            <ul className="experience-list">
                              {instructorData?.experience &&
                                JSON.parse(instructorData?.education)?.map(
                                  (exp, index) => (
                                    <li className="experience-item" key={index}>
                                      <span className="experience-icon">✔</span>
                                      {exp}
                                    </li>
                                  )
                                )}
                            </ul>

                            <h6 className="mt-4"> Skills</h6>
                            <p>
                            {instructorData?.experience &&
                                JSON.parse(instructorData?.skills)?.map(
                                (skill, index) => {
                                    if (
                                    index !==
                                    JSON.parse(instructorData?.skills)?.length - 1
                                    ) {
                                    return `${skill}, `;
                                    } else return skill;
                                }
                                )} and much more.
                            </p>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  </>
  )
}

export default InstructorProfile
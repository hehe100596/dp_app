import React, { useState, useEffect } from "react";

import { useAuth } from "../../utils/auth";
import { globalApiInstance } from "../../utils/api";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { ServerStatus } from "../organisms/ServerStatus";
import { SectionView } from "../templates/SectionView";

export function CoursePage(props) {
  const [rewards, setRewards] = useState([]);
  const [name, setName] = useState("COURSE");
  const [counter, setCounter] = useState(0);
  const [allSections, setAllSections] = useState([]);
  const [sections, setSections] = useState(0);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);

  const auth = useAuth();

  useEffect(() => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "users/getSelectedUsers", {
        tokens: [auth.token],
      })
      .then((res) => {
        if (res.data.data) {
          let user = res.data.data[0];
          let coursePoints = 0;
          let courseRewards = [];
          let courseContent = [];
          let unlockedSections = 0;

          if (user.progress && user.progress.length > 0) {
            let progress = user.progress.find(
              (obj) => obj.course === props.match.params.course
            );

            if (progress) {
              progress.rewards.forEach(function (entry) {
                coursePoints += entry.points;
              });
              courseRewards = progress.rewards;
            }
          }

          globalApiInstance
            .post(process.env.REACT_APP_BASE_API + "courses/getCourse", {
              course: props.match.params.course,
            })
            .then((res) => {
              if (res.data.data) {
                let course = res.data.data;

                if (course.content && course.content.length > 0) {
                  course.content.forEach(function (entry) {
                    if (coursePoints >= entry.unlockPoints) {
                      unlockedSections++;
                    }
                    courseContent.push(entry);
                  });
                }

                courseContent.sort((a, b) =>
                  a.unlockPoints > b.unlockPoints
                    ? 1
                    : b.unlockPoints > a.unlockPoints
                    ? -1
                    : 0
                );

                setRewards(courseRewards);
                setName(course.name);
                setCounter(course.content.length);
                setSections(unlockedSections);
                setAllSections(courseContent);
                setStatus("success");
              }
            })
            .catch((err) => {
              setStatus("error");
              setMessage(err.message);
            });
        }
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [auth.token, props.match.params.course]);

  return (
    <div align="center">
      <Heading level="1">{name}</Heading>
      <EmptyLine level="2" />
      <Heading level="4">Welcome to {name}!</Heading>
      <br />
      <p>
        This course has <b>{counter}</b> sections in total. Complete the last
        section to successfully finish this course!
      </p>
      <p className="text-danger">
        <b>
          <i>
            * If you cannot unlock any new sections, try getting better results
            in sections you currently have
          </i>
        </b>
      </p>
      <EmptyLine level="2" />
      <div className="row">
        <div
          className="col border nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {allSections.map((section, i) => (
            <a
              key={i}
              className={
                "nav-link" +
                (i === sections - 1
                  ? " active"
                  : i >= sections
                  ? " disabled"
                  : "")
              }
              id={i + "-tab"}
              data-toggle="pill"
              href={"#tab" + i}
              role="tab"
              aria-controls={"tab" + i}
              aria-selected="true"
            >
              {section.name}
            </a>
          ))}
        </div>
        <div className="col-9 border tab-content" id="v-pills-tabContent">
          {allSections.map((section, i) => (
            <div
              key={i}
              className={
                "tab-pane fade" + (i === sections - 1 ? " show active" : "")
              }
              id={"tab" + i}
              role="tabpanel"
              aria-labelledby={i + "-tab"}
            >
              <SectionView
                course={props.match.params.course}
                section={section._id}
                name={section.name}
                maxPoints={section.rewardPoints}
                points={
                  rewards.find((obj) => obj.section === section._id)
                    ? rewards.find((obj) => obj.section === section._id).points
                    : 0
                }
              />
            </div>
          ))}
        </div>
      </div>
      <EmptyLine level="2" />
      <ServerStatus status={status} message={message} />
    </div>
  );
}

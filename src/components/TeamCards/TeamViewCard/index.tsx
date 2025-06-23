import { ITeam } from "../../../models/ITeam";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { setTeam } from "../../../features/reducers/TeamReducer";
import { useDispatch } from "react-redux";

interface props {
  team: ITeam;
}

function TeamViewCard({ team }: props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleTeamSelection() {
    dispatch(setTeam(team));
    navigate(`/${team.name}/tasks`);
  }

  return (
    <div className="team-container" onClick={handleTeamSelection}>
      <div>
        <span
          className="material-symbols-outlined team-icon"
          style={{ color: `${team.color}` }}
        >
          {team.icon}{" "}
        </span>
      </div>
      <div className="team-name">{team.name}</div>
      <a
        href={`/${team.name}/tasks`}
        className="app-link"
      >{`View ${team.name} tasks`}</a>
    </div>
  );
}

export default TeamViewCard;

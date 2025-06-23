import { useEffect } from "react";
import TeamViewCard from "../../components/TeamCards/TeamViewCard";
import "./styles.scss";
import { ConfigService } from "../../services/ConfigService";
import { useDispatch } from "react-redux";
import { setStatusList } from "../../features/reducers/Statusreducer";

function LandingPage() {
  const teams = [
    { id: "1", name: "Development", color: "#4F8A8B", icon: "Handyman" },
    { id: "2", name: "Marketing", color: "#F9ED69", icon: "finance_mode" },
    { id: "3", name: "Design", color: "#F08A5D", icon: "brush" },
    { id: "4", name: "HR", color: "#B83B5E", icon: "diversity_3" },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    const configService = new ConfigService();
    configService.GetStatusList().then((statusList) => {
      dispatch(setStatusList(statusList));
    });
  }, [dispatch]);

  return (
    <div className="landing-container">
      <div className="landing-text">Teams</div>
      <div className="teams-container">
        {teams.map((team) => (
          <TeamViewCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;

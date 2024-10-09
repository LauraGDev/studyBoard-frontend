import { useEffect, useState } from "react";
import CalendarComponent from "../../components/calendar/calendarComponent/CalendarComponent";
import GroupNav from "../../components/group/groupNav/GroupNav";
import BoardTagsContainer from "../../components/board/boardTagsContainer/BoardTagsContainer";
import "./group.scss";
import { useLocation } from "react-router-dom";

const Group = ({ name }) => {
    //comprobar si user actual es creador
    //const isCreator = true;
    const [activeView, setActiveView] = useState("Boards");
    const location = useLocation();
    const id = location.state.data;
    
    const handleViewChange = (view) => {
        if (view !== activeView) {
            setActiveView(view);
        }
    };

    const components = {
        'Boards': <BoardTagsContainer key="boards" id={id} />,
        'Calendar': <CalendarComponent key="calendar" />,
    };

    const prueba = {}

    return (
        <>
            <GroupNav onViewChange={handleViewChange} />
            <section className={activeView}>
                {components[activeView]}
            </section>
        </>
    );
};

export default Group;

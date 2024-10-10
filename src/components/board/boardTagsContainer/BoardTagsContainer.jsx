import { useEffect, useState } from "react";
import "./boardTagsContainer.scss";
import Board from "../Board";
import CreateBoard from "../createBoard/CreateBoard";
import { useAuth } from "../../../hooks/useAuth";
import LoadingModal from "../../modals/loadingModal/LoadingModal";
import AlertModal from "../../modals/alertModal/AlertModal";
import { READ_BY_ID } from "../../../config";
import useFetch from "../../../hooks/useFetch";

const BoardTagsContainer = ({ id }) => {
    const { authToken } = useAuth();
    const endpoint = READ_BY_ID.replace("${id}", id);
    const [openCardIndex, setOpenCardIndex] = useState(null);
    const [isCreator, setIsCreator] = useState(false);
    const [boards, setBoards] = useState([]);

    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
    };

    const { data, loading, error, fetch: fetchData } = useFetch(endpoint, fetchOptions, !!authToken);

    useEffect(() => {
        if (data) {
            setIsCreator(data.isCreator);
            setBoards(data.boards || []);
        }
    }, [data]);

    if (loading) return <LoadingModal />;
    if (error) return <AlertModal title="Error:" errorText={error.message} />;
    if (!data) return <AlertModal errorText="No hay datos disponibles" />;


    const toggleBoard = (index) => {
        setOpenCardIndex(openCardIndex === index ? null : index);
    };

    const handleBoardCreated = () => {
        setOpenCardIndex(null)
        fetchData()
        .then(()=> setBoards(data.boards || []))
    };

    return (
        <section className="boards">
            <h1>{data.groupName}</h1>
            <section className="tags">
                {isCreator && (
                    <CreateBoard
                        key={0}
                        isOpen={openCardIndex === 0}
                        toggleBoard={() => toggleBoard(0)}
                        onBoardCreated={handleBoardCreated}
                        id={id}
                    />
                )}
                {boards.length > 0 ? (
                    data.boards.map((board, index) => {
                        return (
                            <Board
                                key={index + 1}
                                color={board.color}
                                name={board.title}
                                isOpen={openCardIndex === index + 1}
                                toggleBoard={() => toggleBoard(index + 1)}
                                id={board.id}
                            />
                        );
                    })
                ) : (
                    <p>No hay tableros disponibles</p>
                )}
            </section>
        </section>
    );
};

export default BoardTagsContainer;

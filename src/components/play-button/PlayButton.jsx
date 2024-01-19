import React, { useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PlayButton = () => {
	const cardRef = useRef(null);
	const navigate = useNavigate();

	const handleClick = () => {
		setTimeout(() => {
			navigate("/game");
		}, 1000);
		cardRef.current.classList.toggle("openCard");
		cardRef.current.classList.toggle("closeCard");
	};
	return (
		<div className="outerContainer">
			<Card className="openCard" ref={cardRef}>
				<Button onClick={handleClick}>Play</Button>
			</Card>
		</div>
	);
};

export default PlayButton;

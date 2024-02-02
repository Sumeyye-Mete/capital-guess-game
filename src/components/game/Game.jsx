import React, { useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { getCountries } from "../api/countries";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

const correct = "correct";
const wrong = "wrong";
const gameOver = "Game is Over!";

const Game = () => {
	const navigate = useNavigate();

	// element refs
	const alertRef = useRef(null);
	const cardRef = useRef(null);
	const inputRef = useRef(null);

	// info refs
	const countryIndex = useRef(null);
	const selectedCountries = useRef(["Turkey"]);
	const countries = useRef([]);
	const sumi = useRef(false);

	//states
	const [score, setScore] = useState(0);
	const [time, setTime] = useState(60);
	const [country, setCountry] = useState("country");
	const [answer, setAnswer] = useState("");
	const [result, setResult] = useState("");

	// functions
	const selectRandomCountry = () => {
		while (true) {
			countryIndex.current = ~~(Math.random() * countries.current.length);
			const selected = countries.current[countryIndex.current]?.name.common;

			if (!selectedCountries.current.includes(selected)) {
				setCountry(selected);
				selectedCountries.current.push(selected);
				return;
			}
		}
	};

	const isAnswerCorrect = () => {
		const guess = answer.toLowerCase();
		const capital =
			countries.current[countryIndex.current].capital[0].toLowerCase();

		if (guess === capital) {
			setResult(correct);
			setScore((prev) => prev + 10);
		} else {
			setResult(wrong);
		}
		console.log("heyeye");
		inputRef.current.focus();
		inputRef.current.value = "";
	};

	const showAlert = (num) => {
		console.log("alert heeyy");
		setTimeout(() => {
			alertRef.current?.classList.add("d-none");
			sumi.current = false;
		}, num);
		alertRef.current?.classList.remove("d-none");
		sumi.current = true;
	};

	// useEffects

	useEffect(() => {
		setTimeout(() => {
			cardRef.current?.classList.add("openCard");
			cardRef.current?.classList.remove("closeCard");
		}, 500);
	}, []);

	useEffect(() => {
		getCountries()
			.then((data) => (countries.current = data))
			.then(() => {
				selectRandomCountry();
			});
	}, []);

	useEffect(() => {
		if (time <= 0) {
			setResult(`${gameOver} Score: ${score}`);
			showAlert(5000);
			setTimeout(() => {
				navigate("/");
			}, 5000);
			return;
		}
		const timer = setInterval(() => {
			setTime((prev) => prev - 1);
		}, 1000);
		return () => {
			clearInterval(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [time]);

	useEffect(() => {}, []);

	// events
	const handleClick = () => {
		// check answer
		isAnswerCorrect();
		// show result
		showAlert(1500);
		// next question
		setTimeout(() => {
			selectRandomCountry();
		}, 500);
	};

	const handleKeyUp = (e) => {
		if (e.key === "Enter") {
			handleClick();
		}
	};

	return (
		<div className="outerContainer">
			<Card className="closeCard gameCard" ref={cardRef}>
				<div className="position-absolute h-100 w-100 d-none" ref={alertRef}>
					{" "}
					<div className="bg-image"></div>
					<div
						className={`last-alert bg-text ${
							result === wrong && "text-danger"
						}`}
					>
						{result}
					</div>
				</div>
				<div className="infoContainer ">
					<Button className="info" disabled>
						Score: {score}
					</Button>
					<Button className="info" disabled>
						Time : {time}
					</Button>
				</div>
				<div className="gameContainer">
					<div>
						<Button className="countryName" disabled>
							{country}
						</Button>
					</div>
					<div>
						<input
							type="text"
							ref={inputRef}
							className="inputText"
							placeholder="guess"
							onChange={(e) => setAnswer(e.target.value)}
							onKeyUp={handleKeyUp}
							disabled={sumi.current}
						/>
					</div>
					<div className="mb-5 d-flex gap-3">
						<Button onClick={handleClick} disabled={sumi.current}>
							Guess
						</Button>
						<Button as={Link} to="/" variant="danger">
							Exit
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Game;

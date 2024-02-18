import { useState } from "react";

export function CharacterCards({ character }) {
    const [clicked, setClicked] = useState(true);
    const [comment, setComment] = useState("");
    
    function toggleClick() {
        setClicked(!clicked);
    }

    function handleChange(event) {
        setComment(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Here, you would typically send the comment and the details of the character
        // to your backend (Node.js, PHP, etc.) server.js
        // and save it to the MySQL database.
        console.log("Comment submitted:", comment);
        console.log("Character details:", character);
        // Reset the comment field after submission
        setComment("");
        // Prevent the click event from reaching the parent card and toggling it back
        event.stopPropagation();
    }
    
    let statusIcon = "";

    switch (character.status) {
        case "Alive":
            statusIcon = "alive";
            break;
        case "Dead":
            statusIcon = "dead";
            break;
        default:
            statusIcon = "unknown";
            break;
    }

    return (
        <>
            {clicked ? 
            (<div className="card" onClick={toggleClick}>
                <div>
                    <img src={character.image} className="cardImage" alt={character.name}></img>
                </div>

                <div className="container">
                    <div className="section1">
                        <h3 className="elementName"><b>{character.name}</b></h3>
                        <div className={statusIcon}></div>
                        <span>{character.status} - {character.species}</span>
                    </div>
                    <div className="section2">
                        <span>Origin:</span>
                        <h4>{character.origin?.name}</h4>
                    </div>
                </div>
            </div>) : 
            <div className="cardMax" onClick={toggleClick}>
                <div className="containerMaxImage">
                    <img src={character.image} className="cardImage" alt={character.name}></img>
                </div>

                <div className="container">
                    <div className="section1">
                        <h3 className="elementName"><b>{character.name}</b></h3>
                        <div className={statusIcon}></div>
                        <span>{character.status} - {character.species} {character.type}</span>
                    </div>
                    <div className="section2">
                        <span>Origin:</span>
                        <h4>{character.origin?.name}</h4>
                    </div>
                    <div className="section2">
                        <span>Gender:</span>
                        <h4>{character.gender}</h4>
                    </div>
                    <div className="section2">
                        <span>Last known location:</span>
                        <h4>{character.location?.name}</h4>
                    </div>
                    <div className="section2">
                        <span>Episodes:</span>
                        <h4>{character.episode.length}</h4>
                    </div>
                    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                        <textarea
                            value={comment}
                            onChange={handleChange}
                            placeholder="Add your comment..."
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            }

        </>

    );
}


export function LocationCards({ location }) {
    return (
        <div className="locationCard">
            <div className="container">
                <div className="section1">
                    <h3 className="elementName"><b>{location.name}</b></h3>
                    <span>{location.dimension}</span>
                </div>
                <div className="section3">
                    <div className="locationType">
                        <span>Type:</span>
                        <h4>{location.type}</h4>
                    </div>
                    <div>
                        <span>Residents:</span>
                        <h4>{location.residents?.length}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
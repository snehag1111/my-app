import React, { useState } from "react";

function MovieTitle(props) {
  const { movie, onClick } = props;
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuClick = (e) => {
    e.stopPropagation();  // Prevent triggering onClick from card
    setMenuVisible(!menuVisible);
  };

  const handleEdit = () => {
    console.log("Edit movie");
    setMenuVisible(false);
    movie.action = 'Edit';
    onClick(movie);
  };

  const handleDelete = () => {
    console.log("Delete movie");
    setMenuVisible(false);
    movie.action = 'Delete';
    onClick(movie);
  };

  const styles = {
    card: {
      display: "flex",
      flexDirection: "column", // Stack image and content vertically
      width: "300px", // Adjust card width
      overflow: "hidden",
      cursor: "pointer",
      marginBottom: "20px", // Space between cards
      marginLeft: "20px",
      position: "relative", // Ensure position relative to card itself
    },
    image: {
      width: "100%", // Make image take full width
      height: "400px", // Fixed height for the image
      objectFit: "cover", // Maintain aspect ratio
    },
    textContent: {
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    topRow: {
      display: "flex",
      justifyContent: "space-between", // This makes movieName and releaseYear on opposite sides
      alignItems: "center",
    },
    title: {
      fontSize: "18px",
      marginBottom: "5px",
      wordWrap: "break-word", // Ensure title doesn't overflow
    },
    releaseYear: {
      fontSize: "14px",
      color: "#555",
      border: "1px solid #aaa",
      padding: "4px 8px",
      borderRadius: "3px",
    },
    genres: {
      display: "flex",
      flexWrap: "wrap",
      gap: "5px",
      marginTop: "10px",
    },
    genre: {
      padding: "5px 2px",
      fontSize: "12px",
      color: "#666",
    },
    imageWrapper: {
      position: "relative", // This ensures that absolutely positioned elements are placed relative to it
    },
    menuButton: {
      position: "absolute",
      top: "10px", // Space from the top
      right: "10px", // Space from the right edge
      background: "transparent",
      border: "none",
      fontSize: "20px",
      color: "white",
      cursor: "pointer",
      zIndex: 10, // Make sure it's above the image
    },
    menu: {
      position: "absolute",
      top: "35px", // Position the menu below the three-dot button
      right: "0",
      background: "#fff",
      border: "1px solid #ccc",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      zIndex: 20, // Ensure the menu appears above the image and button
    },
    menuItem: {
      padding: "10px",
      border: "none",
      background: "none",
      cursor: "pointer",
      textAlign: "left",
      width: "100%",
    },
  };

  return React.createElement(
    "div",
    { className: "movie-card", onClick: () => onClick(movie), style: { ...styles.card } },
    React.createElement(
      "div",
      { style: styles.imageWrapper },
      React.createElement("img", {
        src: movie.poster_path,
        alt: movie.title,
        style: styles.image,
      }),
      React.createElement(
        "button",
        { onClick: handleMenuClick, style: styles.menuButton },
        <b>⋮</b> // Three-dot character
      ),
      menuVisible &&
        React.createElement(
          "div",
          { style: styles.menu },
          React.createElement(
            "button",
            { onClick: handleEdit, style: styles.menuItem },
            "Edit"
          ),
          React.createElement(
            "button",
            { onClick: handleDelete, style: styles.menuItem },
            "Delete"
          )
        )
    ),
    React.createElement(
      "div",
      { style: styles.textContent },
      React.createElement(
        "div",
        { style: styles.topRow },
        React.createElement(
          "div",
          { style: styles.title },
          movie.title
        ),
        React.createElement(
          "span",
          { style: styles.releaseYear },
          movie.release_date
        )
      ),
      React.createElement(
        "div",
        { style: styles.genres },
        movie.genres.map((genre, index) => {
          return React.createElement(
            "span",
            { key: index, style: styles.genre },
            genre
          );
        })
      )
    )
  );
}

export default MovieTitle;

import React, { useState, useRef, useEffect } from "react";
import NavBar from "./Components/Navbar";
import TitleFiller from "./Components/TitleFiller";
import SearchBar from "./Components/SearchBar";
import FilterFavButton from "./Components/FilterFavButton";
import FilterHistoryButton from "./Components/FilterHistoryButton";
import FilterOriginDropdown from "./Components/FilterOriginDropdown";
import FilterGradeDropdown from "./Components/FilterGradeDropdown";
import Propheader from "./Components/Propheader";
import Propitem from "./Components/Propitem";
import "./App.css";
// import already parses json files
import test_json from "./assets/testlist.json";
import productList from "./assets/productlist.json";
import ResetFiltersButton from "./Components/ResetFiltersButton";

function App() {
  // Loading json
  //const productlist = test_json.productList;
  const productlist = productList.productList;

  // Setting up parent-child state coordination
  const [selectedOrigins, setSelectedOrigins] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [favoritedItems, setFavoritedItems] = useState([]);
  const [historiedItems, setHistoriedItems] = useState([]);
  const [isFavButtonOn, setIsFavButtonOn] = useState(false);
  const [isHistButtonOn, setIsHistButtonOn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [propHeaderArrowStates, setPropHeaderArrowStates] = useState({
    name: "arrowSleep",
    catching: "arrowSleep",
    grade: "arrowSleep",
    origin: "arrowSleep",
  });

  // Setting up respective state handlers
  const handleOriginChange = (selectedOrigins) => {
    setSelectedOrigins(selectedOrigins);
  };
  const handleGradeChange = (selectedGrades) => {
    setSelectedGrades(selectedGrades);
  };

  const handleHistoryToggle = (selectedHistories) => {
    setHistoriedItems((prevHistoriedItems) => {
      if (prevHistoriedItems.includes(selectedHistories)) {
        return prevHistoriedItems.filter((item) => item !== selectedHistories);
      } else {
        return [...prevHistoriedItems, selectedHistories];
      }
    });
  };

  const handleFavoriteToggle = (selectedFavorites) => {
    setFavoritedItems((prevFavoritedItems) => {
      if (prevFavoritedItems.includes(selectedFavorites)) {
        return prevFavoritedItems.filter((item) => item !== selectedFavorites);
      } else {
        return [...prevFavoritedItems, selectedFavorites];
      }
    });
  };

  const handleFavButtonToggle = () => {
    setIsFavButtonOn(!isFavButtonOn);
  };

  const handleHistButtonToggle = () => {
    setIsHistButtonOn(!isHistButtonOn);
  };

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const handlePropHeaderArrowToggle = (arrowStates) => {
    setPropHeaderArrowStates(arrowStates);
  };

  const handleFiltersReset = () => {
    setSelectedOrigins([]);
    setSelectedGrades([]);
    setIsFavButtonOn(false);
    setIsHistButtonOn(false);
    setSearchQuery("");
  };

  // Filtering process
  const filteredlist = productlist.filter(
    (item) =>
      // Discriminate according to selected origins
      (selectedOrigins.length === 0 || selectedOrigins.includes(item.origin)) &&
      // Discriminate according to selected grades
      (selectedGrades.length === 0 || selectedGrades.includes(item.grade)) &&
      // Discriminate according to favorited items
      (!isFavButtonOn ||
        !favoritedItems.length ||
        favoritedItems.includes(item.id)) &&
      // Discriminate according to favorited items
      (!isHistButtonOn ||
        !historiedItems.length ||
        historiedItems.includes(item.id)) &&
      // Discriminate according to character string presence
      (!searchQuery ||
        item.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            searchQuery
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          ))
  );

  // Sorting process: name, catching, grade, origin
  if (
    propHeaderArrowStates.name !== "arrowSleep" &&
    propHeaderArrowStates.name === "arrowDown"
  ) {
    // Ascending sort comparison
    filteredlist.sort((a, b) =>
      a.name === "" ? 1 : b.name === "" ? -1 : a.name.localeCompare(b.name)
    );
  } else if (propHeaderArrowStates.name === "arrowUp") {
    // Descending sort comparison
    filteredlist.sort((a, b) =>
      a.name === "" ? 1 : b.name === "" ? -1 : b.name.localeCompare(a.name)
    );
  } else if (
    propHeaderArrowStates.catching !== "arrowSleep" &&
    propHeaderArrowStates.catching === "arrowDown"
  ) {
    // Ascending sort comparison
    filteredlist.sort((a, b) =>
      a.catching === ""
        ? 1
        : b.catching === ""
        ? -1
        : a.catching.localeCompare(b.catching)
    );
  } else if (propHeaderArrowStates.catching === "arrowUp") {
    // Descending sort comparison
    filteredlist.sort((a, b) =>
      a.catching === ""
        ? 1
        : b.catching === ""
        ? -1
        : b.catching.localeCompare(a.catching)
    );
  } else if (
    propHeaderArrowStates.grade !== "arrowSleep" &&
    propHeaderArrowStates.grade === "arrowDown"
  ) {
    // Ascending sort comparison
    filteredlist.sort((a, b) =>
      a.grade === "" ? 1 : b.grade === "" ? -1 : a.grade.localeCompare(b.grade)
    );
  } else if (propHeaderArrowStates.grade === "arrowUp") {
    // Descending sort comparison
    filteredlist.sort((a, b) =>
      a.grade === "" ? 1 : b.grade === "" ? -1 : b.grade.localeCompare(a.grade)
    );
  } else if (
    propHeaderArrowStates.origin !== "arrowSleep" &&
    propHeaderArrowStates.origin === "arrowDown"
  ) {
    // Ascending sort comparison
    filteredlist.sort((a, b) =>
      a.origin === ""
        ? 1
        : b.origin === ""
        ? -1
        : a.origin.localeCompare(b.origin)
    );
  } else if (propHeaderArrowStates.origin === "arrowUp") {
    // Descending sort comparison
    filteredlist.sort((a, b) =>
      a.origin === ""
        ? 1
        : b.origin === ""
        ? -1
        : b.origin.localeCompare(a.origin)
    );
  }

  const qty = filteredlist.length;
  const items = filteredlist.map((item) => {
    return (
      <Propitem
        key={item.id}
        item={item}
        onFavoriteToggle={handleFavoriteToggle}
        onHistoryToggle={handleHistoryToggle}
      />
    );
  });

  return (
    <div className="App">
      <NavBar />
      <TitleFiller />
      <div className="app--background">
        <span className="app--background--filters">
          <SearchBar onQuery={handleSearchQuery} parentState={searchQuery} />
          <FilterFavButton
            onToggle={handleFavButtonToggle}
            parentState={isFavButtonOn}
          />
          <FilterHistoryButton
            onToggle={handleHistButtonToggle}
            parentState={isHistButtonOn}
          />
          <FilterOriginDropdown
            list={productlist}
            onChange={handleOriginChange}
            parentState={selectedOrigins}
          />
          <FilterGradeDropdown
            list={productlist}
            onChange={handleGradeChange}
            parentState={selectedGrades}
          />
          <ResetFiltersButton onReset={handleFiltersReset} />
        </span>
        <h4 className="app--background--productQty">{qty} produits</h4>
        <Propheader onChange={handlePropHeaderArrowToggle} />
        {items}
      </div>
    </div>
  );
}

export default App;

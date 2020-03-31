import React from "react";
import CreateGenderMapResultsContainer from "./CreateGenderMapResultsContainer.js";
import europeCopyMap from "../images/my_europe_template.svg";
const fs = require("fs");

// const REACT_APP_URL = process.env.REACT_APP_URL;
const url = "http://localhost:3001/api/v1";
// const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

class CreateGenderMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: "Europe",
      selectedWord: "silver",
      allWords: [],
      allLocations: [],
      results: [],
      searchedWord: "",
      searchedLocation: "",
      imageResults: ""
    };
  }

  componentDidMount() {
    this.getAllWordNames();
    this.getAllAreas();
  }

  getAllWordNames() {
    fetch(`${url}/search/all_word_names`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          allWords: res.data
        })
      )
      .catch(err => console.log(err));
  }

  getAllAreas() {
    fetch(`${url}/search/all_areas`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          allLocations: res.data
        })
      )
      .catch(err => console.log(err));
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = e => {
    console.log("handleOnSubmit fires");
    e.preventDefault();
    fetch(
      `${url}/search/all_translations_by_area/${this.state.selectedLocation}/${this.state.selectedWord}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          results: res.data,
          searchedLocation: this.state.selectedLocation,
          searchedWord: this.state.selectedWord,
          selectedLocation: "",
          selectedWord: ""
        })
      )
      .catch(err => console.log(err));

    fetch(
      `${url}/search/all_genders_by_area_img/${this.state.selectedLocation}/${this.state.selectedWord}`
    )
      .then(res => res.blob())
      .then(res => {
        console.log(res);
        return res;
      })
      .then(images => {
        // Then create a local URL for that image and print it
        let outside = URL.createObjectURL(images);
        console.log("outside=", outside);
        this.setState({ imageResults: outside });
      })
      .catch(err => console.warn(err));
  };

  onHandleEdit = (e, translationId) => {
    e.preventDefault();
    console.log("translationId=", translationId);
    this.props.history.push(`/edit_translation/${translationId}`);
  };

  makeImg = () => {
    console.log("makeImg fires");
    const resultsArray = [...this.state.imageResults];
    console.log("resultArray = ", resultsArray);
    // fs.writeFile("../images/europe_template_copy.svg", (err, data) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   } else {
    //     console.log(data);
    //   }
    // });
    // let fileName = fs.writeFile("../images/europe_template_copy.svg");
    // let counter = 0;
    // for (let language in resultsArray) {
    //   console.log(`${language}, ${counter}`);
    //   fileName = fileName.replace("$" + language[0], resultsArray[counter][1]);
    //   counter++;
    // }

    const combo = [
      ["ab", "168d4f"],
      ["ar", "ffffb1"],
      ["az", "d45500"],
      ["be", "b5ff64"],
      ["bos", "abc837"],
      ["br", "178df0"],
      ["bg", "36ae22"],
      ["ca", "00ffff"],
      ["cau", "d38d5f"],
      ["cs", "00cb60"],
      ["co", "c0003c"],
      ["cy", "ff7f29"],
      ["da", "ff5555"],
      ["de", "d09999"],
      ["el", "ffff00"],
      ["en", "ffaaaa"],
      ["et", "b7c8be"],
      ["eu", "ffd42a"],
      ["fo", "ff0000"],
      ["fi", "6f997a"],
      ["fr", "53bbb5"],
      ["fy", "d66c74"],
      ["ga", "fd6d3c"],
      ["gd", "ff7f2a"],
      ["gl", "00d4aa"],
      ["gag", "c837ab"],
      ["hr", "abc837"],
      ["hu", "ac9d93"],
      ["hy", "008080"],
      ["is", "f19076"],
      ["it", "7bafe0"],
      ["ka", "f4e3d7"],
      ["kk", "deaa87"],
      ["krl", "93ac93"],
      ["lv", "de87cd"],
      ["lt", "e9afdd"],
      ["lij", "f2003c"],
      ["lb", "55ddff"],
      ["mk", "71c837"],
      ["mt", "a0892c"],
      ["nap", "f5003c"],
      ["nl", "f4d7d7"],
      ["no", "ff8080"],
      ["oc", "168d5f"],
      ["os", "985fd3"],
      ["pms", "f2d53c"],
      ["pl", "7ecb60"],
      ["pt", "00d4d4"],
      ["rm", "008079"],
      ["ro", "aaccff"],
      ["ru", "72ff00"],
      ["sc", "c0ee3c"],
      ["sco", "168df0"],
      ["scn", "cc003c"],
      ["sk", "42f460"],
      ["sl", "81c98d"],
      ["se", "cccccc"],
      ["es", "acd8ed"],
      ["sq", "a0856c"],
      ["srp", "abc837"],
      ["sv", "ffb380"],
      ["tt", "c7a25f"],
      ["tk", "cc9e4c"],
      ["uk", "c1ff00"],
      ["ven", "f28d3c"],
      ["xal", "d34d5f"],
      ["sh", "abc837"]
    ];

    let languagesArray = combo.map(item => item[0]);
    let colorCodesArray = combo.map(item => item[1]);

    // let filename =

    //   languages_array = combo.map{|item| item[0]}
    //   color_codes_array = combo.map{|item| item[1]}
    //   result_array = Translation.find_all_genders_by_area_img(params[:location], params[:word])

    //   filename = File.open("public/my_europe_template.svg", "r")
    //   file_source = filename.read()

    //   counter = 0
    //   for language in result_array
    //     # puts "#{language}, #{counter}"
    //     file_source = file_source.sub("$" + language[:abbreviation], result_array[counter][:translation])

    //     result_color = ''
    //     case language[:gender]
    //     when nil
    //       result_color = 'D3D3D3'
    //     when ""
    //       result_color = 'D3D3D3'
    //     when "m"
    //       result_color = '00BFFF'
    //     when "f"
    //       result_color = 'FF1493'
    //     when "n"
    //       result_color = '778899'
    //     else
    //       result_color = 'D3D3D3'
    //     end
    //     existing_color = nil
    //     if languages_array.include?(language[:abbreviation])
    //       existing_color = color_codes_array[languages_array.find_index(language[:abbreviation])]
    //     end

    //     if !existing_color.nil?
    //       file_source = file_source.gsub("#" + existing_color, "#" + result_color)
    //     end
    //     counter += 1
    //   end

    //   FileUtils.copy_entry("public/my_europe_template.svg", "public/my_europe_copy_template.svg", preserve = false, dereference = false, remove_destination = true)

    //   the_new_map = open("public/my_europe_copy_template.svg", "w")

    //   the_new_map.write(file_source)
    //   # the_new_map.close()

    //   send_file the_new_map, disposition: :inline
  };

  render() {
    const allWords =
      this.state.allWords.length > 0
        ? this.state.allWords.map(word => {
            return <option key={word.id}>{word.word_name}</option>;
          })
        : null;
    const allLocations =
      this.state.allLocations && this.state.allLocations.length > 0
        ? this.state.allLocations.map((location, index) => {
            return location ? <option key={index}>{location}</option> : null;
          })
        : null;
    return (
      <>
        <form onSubmit={e => this.handleOnSubmit(e)}>
          <select
            id="select"
            name="selectedLocation"
            value={this.state.selectedLocation}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Location</option>
            {allLocations}
          </select>
          <select
            id="select"
            name="selectedWord"
            value={this.state.selectedWord}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Word</option>
            {allWords}
          </select>
          <input
            type="submit"
            value="Search"
            className={
              this.state.selectedLocation && this.state.selectedWord
                ? "submit-btn"
                : "disabled"
            }
            disabled={!this.state.selectedLocation || !this.state.selectedWord}
          />
        </form>
        {/* <img src={europeCopyMap} alt="europe map" /> */}
        {/* <img
          src={`${url}/search/all_genders_by_area_img/${this.state.selectedLocation}/${this.state.selectedWord}/my_europe_copy_template.svg`}
          alt="europe map"
        /> */}
        {/* <img
          src={`${url}/search/all_genders_by_area_img/`}
          alt="europe language map"
        /> */}
        <h3>Location: {this.state.searchedLocation}</h3>
        <h3>Word: {this.state.searchedWord}</h3>
        {this.state.imageResults ? (
          <img src={this.state.imageResults} alt="europe language map" />
        ) : null}

        <CreateGenderMapResultsContainer
          results={this.state.results}
          searchedWord={this.state.searchedWord}
          searchedLocation={this.state.searchedLocation}
          onHandleEdit={this.onHandleEdit}
        />
      </>
    );
  }
}

export default CreateGenderMap;

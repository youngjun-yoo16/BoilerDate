import { useState, useEffect } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { MultiSelect } from "primereact/multiselect";
import "./Filter.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function valuetext(value) {
  return `${value}°C`;
}

function Filter() {
  const [gender, setGender] = useState("");
  const [gpa, setGpa] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");

  const [interests, setInterests] = useState([]);
  const [lifestyle, setLifestyle] = useState([]);

  const [heightRange, setHeightRange] = useState([48, 95]);
  const [ageRange, setAgeRange] = useState([18, 99]);

  const [personality, setPersonality] = useState("");
  const [relationship, setRelationship] = useState("");
  const [citizenship, setCitizenship] = useState("");

  const interestsData = [
    "Travel",
    "Soccer",
    "Music",
    "Outdoors",
    "Movies",
    "Snowboarding",
    "Art Galleries",
    "YouTube",
    "Xbox",
    "Beach",
    "Weightlifting",
    "Walking My Dog",
    "World Peace",
    "Twitter",
    "Virtual Reality",
    "Tango",
    "Tennis",
    "Skiing",
    "Dancing",
    "Road Trips",
    "Climate Change",
    "Football",
    "Festivals",
    "Tattoos",
    "Crossfit",
    "LGBTQ+ Rights",
    "K-Pop",
    "Reading",
    "Photography",
    "Sports",
    "Country Music",
    "Sushi",
    "Hockey",
    "Skincare",
    "Running",
    "Basketball",
    "Boxing",
    "Cars",
    "Walking",
    "Robotics",
    "Instagram",
    "Foodie Tour",
    "Shopping",
    "Clubbing",
    "Self Care",
    "Yoga",
    "Gym",
    "Skateboarding",
    "Coffee",
    "AI",
    "Poetry",
    "Singing",
    "Ice Skating",
    "Gaming",
    "Pilates",
    "Ice Cream",
    "Cheerleading",
    "Motor Sports",
    "E-Sports",
    "Painting",
    "Bowling",
    "Surfing",
    "Coding",
    "Cooking",
    "Motorcycles",
    "Art",
    "Tea",
    "Wine",
    "Volunteering",
    "Vlogging",
    "Anime",
    "Ramen",
    "Volleyball",
    "League of Legends",
    "Baseball",
    "Band",
    "TikTok",
    "Comedy",
    "Blogging",
    "Netflix",
    "Horror Movies",
    "Programming",
    "Math",
    "Environment",
    "Stock Exchange",
    "Equality",
    "Animals",
    "Guitar",
    "Gospel",
    "Parties",
    "Hip Hop",
    "Indoor Activities",
    "Literature",
    "Jogging",
    "Science",
    "Korean Food",
    "Night Life",
    "Online Shopping",
    "NBA",
    "Trying New Things",
    "Self Development",
  ];

  const [pets, setPets] = useState("");
  const [drinking, setDrinking] = useState("");
  const [smoking, setSmoking] = useState("");
  const [workout, setWorkout] = useState("");
  const [diet, setDiet] = useState("");
  const [social, setSocial] = useState("");
  const [sleeping, setSleeping] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state || {};

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const handleHeight = (event, newValue) => {
    setHeightRange(newValue);
    //console.log(newValue);
  };
  const handleAge = (event, newValue) => {
    setAgeRange(newValue);
    //console.log(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/filter", {
        email,
        gender,
        age: ageRange,
        gpa,
        major,
        degree,
        interests,
        lifestyle,
        height: heightRange,
        personality,
        relationship,
        citizenship,
      })
      .then((result) => {
        console.log(result);
        navigate("/home", { state: { email: email } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-75">
        <h2>Filter</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <p>Gender</p>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="gender-radio-buttons"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="non-binary"
                  control={<Radio />}
                  label="Non-binary"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  onChange={(e) => setGender(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">GPA</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gpa}
                    label="GPA"
                    onChange={(e) => setGpa(e.target.value)}
                  >
                    <MenuItem value={"3.5-4.0"}>3.5 - 4.0</MenuItem>
                    <MenuItem value={"3.0-3.5"}>3.0 - 3.5</MenuItem>
                    <MenuItem value={"<3.0"}> &lt; 3.0</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="mb-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Major</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={major}
                    label="Major"
                    onChange={(e) => setMajor(e.target.value)}
                  >
                    <MenuItem value={"Computer Science"}>
                      Computer Science
                    </MenuItem>
                    <MenuItem value={"Engineering"}>Engineering</MenuItem>
                    <MenuItem value={"Math"}>Math</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="mb-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Degree type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={degree}
                    label="Degree type"
                    onChange={(e) => setDegree(e.target.value)}
                  >
                    <MenuItem value={"BA"}>BA</MenuItem>
                    <MenuItem value={"MA"}>MA</MenuItem>
                    <MenuItem value={"PhD"}>PhD</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="mb-3">
                <Box sx={{ width: 300 }}>
                  <p>Height (inches)</p>
                  <Slider
                    getAriaLabel={() => "Height range"}
                    value={heightRange}
                    onChange={handleHeight}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={48}
                    max={95}
                  />
                </Box>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Personality
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={personality}
                    label="Personality"
                    onChange={(e) => setPersonality(e.target.value)}
                  >
                    <MenuItem value={"ISTJ"}>ISTJ</MenuItem>
                    <MenuItem value={"ISTP"}>ISTP</MenuItem>
                    <MenuItem value={"ISFJ"}>ISFJ</MenuItem>
                    <MenuItem value={"ISFP"}>ISFP</MenuItem>
                    <MenuItem value={"INTJ"}>INTJ</MenuItem>
                    <MenuItem value={"INTP"}>INTP</MenuItem>
                    <MenuItem value={"INFJ"}>INFJ</MenuItem>
                    <MenuItem value={"INFP"}>INFP</MenuItem>
                    <MenuItem value={"ESTJ"}>ESTJ</MenuItem>
                    <MenuItem value={"ESTP"}>ESTP</MenuItem>
                    <MenuItem value={"ESFJ"}>ESFJ</MenuItem>
                    <MenuItem value={"ESFP"}>ESFP</MenuItem>
                    <MenuItem value={"ENTJ"}>ENTJ</MenuItem>
                    <MenuItem value={"ENTP"}>ENTP</MenuItem>
                    <MenuItem value={"ENFJ"}>ENFJ</MenuItem>
                    <MenuItem value={"ENFP"}>ENFP</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="mb-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Relationship goals
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={relationship}
                    label="Relationship"
                    onChange={(e) => setRelationship(e.target.value)}
                  >
                    <MenuItem value={"Long-term"}>Long-term</MenuItem>
                    <MenuItem value={"Long-term, open to short"}>
                      Long-term, open to short
                    </MenuItem>
                    <MenuItem value={"Short-term, open to long"}>
                      Short-term, open to long
                    </MenuItem>
                    <MenuItem value={"Short-term"}>Short-term</MenuItem>
                    <MenuItem value={"Friends"}>Friends</MenuItem>
                    <MenuItem value={"Still figuring it out"}>
                      Still figuring it out
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="mb-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Citizenship status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={citizenship}
                    label="Citizenship"
                    onChange={(e) => setCitizenship(e.target.value)}
                  >
                    <MenuItem value={"U.S. citizen"}>U.S. citizen</MenuItem>
                    <MenuItem value={"Greencard"}>Greencard</MenuItem>
                    <MenuItem value={"International"}>International</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="mb-0">
                <Box sx={{ width: 300 }}>
                  <p>Age</p>
                  <Slider
                    getAriaLabel={() => "Age range"}
                    value={ageRange}
                    onChange={handleAge}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={18}
                    max={99}
                  />
                </Box>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="interestOptions flex justify-content-center">
              <MultiSelect
                value={interests}
                onChange={(e) => setInterests(e.value)}
                options={interestsData}
                placeholder="Select Interests"
                className="w-full md:w-20rem"
              />
            </div>
          </div>

          <div className="mb-0">
            <p>Lifestyle</p>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="pet-radio-buttons"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Cat"
                  control={<Radio />}
                  label="Cat"
                  onChange={(e) => setPets(e.target.value)}
                />
                <FormControlLabel
                  value="Dog"
                  control={<Radio />}
                  label="Dog"
                  onChange={(e) => setPets(e.target.value)}
                />
                <FormControlLabel
                  value="Bird"
                  control={<Radio />}
                  label="Bird"
                  onChange={(e) => setPets(e.target.value)}
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                  onChange={(e) => setPets(e.target.value)}
                />
                <FormControlLabel
                  value="Don't have but love"
                  control={<Radio />}
                  label="Don't have but love"
                  onChange={(e) => setPets(e.target.value)}
                />
                <FormControlLabel
                  value="Pet free"
                  control={<Radio />}
                  label="Pet free"
                  onChange={(e) => setPets(e.target.value)}
                />
                <FormControlLabel
                  value="Allergic to pets"
                  control={<Radio />}
                  label="Allergic to pets"
                  onChange={(e) => setPets(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="mb-0">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="drinking-radio-buttons"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Not for me"
                  control={<Radio />}
                  label="Not for me"
                  onChange={(e) => setDrinking(e.target.value)}
                />
                <FormControlLabel
                  value="Sober"
                  control={<Radio />}
                  label="Sober"
                  onChange={(e) => setDrinking(e.target.value)}
                />
                <FormControlLabel
                  value="On special occasions"
                  control={<Radio />}
                  label="On special occasions"
                  onChange={(e) => setDrinking(e.target.value)}
                />
                <FormControlLabel
                  value="On weekends"
                  control={<Radio />}
                  label="On weekends"
                  onChange={(e) => setDrinking(e.target.value)}
                />
                <FormControlLabel
                  value="Most nights"
                  control={<Radio />}
                  label="Most nights"
                  onChange={(e) => setDrinking(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="mb-0">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="smoking-radio-buttons"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Social smoker"
                  control={<Radio />}
                  label="Social smoker"
                  onChange={(e) => setSmoking(e.target.value)}
                />
                <FormControlLabel
                  value="Smoker when drinking"
                  control={<Radio />}
                  label="Smoker when drinking"
                  onChange={(e) => setSmoking(e.target.value)}
                />
                <FormControlLabel
                  value="Non-smoker"
                  control={<Radio />}
                  label="Non-smoker"
                  onChange={(e) => setSmoking(e.target.value)}
                />
                <FormControlLabel
                  value="Smoker"
                  control={<Radio />}
                  label="Smoker"
                  onChange={(e) => setSmoking(e.target.value)}
                />
                <FormControlLabel
                  value="Trying to quit"
                  control={<Radio />}
                  label="Trying to quit"
                  onChange={(e) => setSmoking(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="mb-0">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="workout-radio-buttons"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Everyday"
                  control={<Radio />}
                  label="Everyday"
                  onChange={(e) => setWorkout(e.target.value)}
                />
                <FormControlLabel
                  value="Often"
                  control={<Radio />}
                  label="Often"
                  onChange={(e) => setWorkout(e.target.value)}
                />
                <FormControlLabel
                  value="Sometimes"
                  control={<Radio />}
                  label="Sometimes"
                  onChange={(e) => setWorkout(e.target.value)}
                />
                <FormControlLabel
                  value="Never"
                  control={<Radio />}
                  label="Never"
                  onChange={(e) => setWorkout(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="mb-0">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="diet-radio-buttons"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Vegan"
                  control={<Radio />}
                  label="Vegan"
                  onChange={(e) => setDiet(e.target.value)}
                />
                <FormControlLabel
                  value="Vegetarian"
                  control={<Radio />}
                  label="Vegetarian"
                  onChange={(e) => setDiet(e.target.value)}
                />
                <FormControlLabel
                  value="Pescatarian"
                  control={<Radio />}
                  label="Pescatarian"
                  onChange={(e) => setDiet(e.target.value)}
                />
                <FormControlLabel
                  value="Kosher"
                  control={<Radio />}
                  label="Kosher"
                  onChange={(e) => setDiet(e.target.value)}
                />
                <FormControlLabel
                  value="Halal"
                  control={<Radio />}
                  label="Halal"
                  onChange={(e) => setDiet(e.target.value)}
                />
                <FormControlLabel
                  value="Carnivore"
                  control={<Radio />}
                  label="Carnivore"
                  onChange={(e) => setDiet(e.target.value)}
                />
                <FormControlLabel
                  value="Omnivore"
                  control={<Radio />}
                  label="Omnivore"
                  onChange={(e) => setDiet(e.target.value)}
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                  onChange={(e) => setDiet(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="mb-0">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="social-radio-buttons"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Influencer status"
                  control={<Radio />}
                  label="Influencer status"
                  onChange={(e) => setSocial(e.target.value)}
                />
                <FormControlLabel
                  value="Socially active"
                  control={<Radio />}
                  label="Socially active"
                  onChange={(e) => setSocial(e.target.value)}
                />
                <FormControlLabel
                  value="Off"
                  control={<Radio />}
                  label="Off"
                  onChange={(e) => setSocial(e.target.value)}
                />
                <FormControlLabel
                  value="Passive scroller"
                  control={<Radio />}
                  label="Passive scroller"
                  onChange={(e) => setSocial(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="mb-0">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="sleeping-radio-buttons"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Early bird"
                  control={<Radio />}
                  label="Early bird"
                  onChange={(e) => setSleeping(e.target.value)}
                />
                <FormControlLabel
                  value="Night owl"
                  control={<Radio />}
                  label="Night owl"
                  onChange={(e) => setSleeping(e.target.value)}
                />
                <FormControlLabel
                  value="In a spectrum"
                  control={<Radio />}
                  label="In a spectrum"
                  onChange={(e) => setSleeping(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div>

          <br />
          <div>
            <button type="submit" className="btn btn-outline-primary w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Filter;
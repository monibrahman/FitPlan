function Profile({
  profile,
  profilemessage,
  profileAge, setProfileAge,
  profileWeight, setProfileWeight,
  profileHeight, setProfileHeight,
  profileGoal, setProfileGoal,
  profileActivityLevel, setProfileActivityLevel,
  profileDietaryPreference, setProfileDietaryPreference,
  handleCreateProfile,
  handleGetProfile,
  handleLogout,
}) {
  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleGetProfile}>Get Profile</button>
      <button onClick={handleLogout}>Logout</button>
      <p>{profilemessage}</p>

      {profile ? (
        <div>
          <h3>Your Profile</h3>
          <p>Age: {profile.age}</p>
          <p>Weight: {profile.weight}</p>
          <p>Height: {profile.height}</p>
          <p>Goal: {profile.goal}</p>
          <p>Activity Level: {profile.activity_level}</p>
          <p>Dietary Preference: {profile.dietary_preference}</p>
        </div>
      ) : (
        <div>
          <h3>Create Profile</h3>
          <div>
            <input type="number" placeholder="Age" value={profileAge}
              onChange={(e) => setProfileAge(e.target.value)} />
          </div>
          <div>
            <input type="number" placeholder="Weight (lbs)" value={profileWeight}
              onChange={(e) => setProfileWeight(e.target.value)} />
          </div>
          <div>
            <input type="number" placeholder="Height (inches)" value={profileHeight}
              onChange={(e) => setProfileHeight(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="Goal" value={profileGoal}
              onChange={(e) => setProfileGoal(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="Activity Level" value={profileActivityLevel}
              onChange={(e) => setProfileActivityLevel(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="Dietary Preference" value={profileDietaryPreference}
              onChange={(e) => setProfileDietaryPreference(e.target.value)} />
          </div>
          <button onClick={handleCreateProfile}>Create Profile</button>
        </div>
      )}
    </div>
  )
}

export default Profile
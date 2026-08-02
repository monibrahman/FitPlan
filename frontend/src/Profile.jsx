function Profile({
  user,
  profile, profilemessage,
  profileAge, setProfileAge,
  profileWeight, setProfileWeight,
  profileHeight, setProfileHeight,
  profileGoal, setProfileGoal,
  profileActivityLevel, setProfileActivityLevel,
  profileDietaryPreference, setProfileDietaryPreference,
  handleCreateProfile, handleGetProfile, handleLogout,
}) {
  return (
    <div className="max-w-md mx-auto">
     <h2 className="text-2xl font-bold mb-6 text-center">
  Welcome{user?.full_name ? `, ${user.full_name}` : ''}!
</h2>

      {profilemessage && (
        <p className="mb-4 text-center text-sm text-gray-600">{profilemessage}</p>
      )}

      {profile ? (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Your Profile</h3>
          <div className="space-y-2">
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-500">Age</span>
              <span className="font-medium">{profile.age}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-500">Weight</span>
              <span className="font-medium">{profile.weight} lbs</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-500">Height</span>
              <span className="font-medium">{profile.height} in</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-500">Goal</span>
              <span className="font-medium">{profile.goal}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-500">Activity Level</span>
              <span className="font-medium">{profile.activity_level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Dietary Preference</span>
              <span className="font-medium">{profile.dietary_preference}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Create Profile</h3>
          <input className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number" placeholder="Age" value={profileAge}
            onChange={(e) => setProfileAge(e.target.value)} />
          <input className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number" placeholder="Weight (lbs)" value={profileWeight}
            onChange={(e) => setProfileWeight(e.target.value)} />
          <input className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number" placeholder="Height (inches)" value={profileHeight}
            onChange={(e) => setProfileHeight(e.target.value)} />
          <input className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text" placeholder="Goal" value={profileGoal}
            onChange={(e) => setProfileGoal(e.target.value)} />
          <input className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text" placeholder="Activity Level" value={profileActivityLevel}
            onChange={(e) => setProfileActivityLevel(e.target.value)} />
          <input className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text" placeholder="Dietary Preference" value={profileDietaryPreference}
            onChange={(e) => setProfileDietaryPreference(e.target.value)} />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
            onClick={handleCreateProfile}>Create Profile</button>
        </div>
      )}

      <button onClick={handleGetProfile}
        className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded font-semibold">
        Refresh Profile
      </button>
    </div>
  )
}

export default Profile
import ProfileImg from "../profileImg/ProfileImg";
import Input from "../inputs/Input";
import MainButton from "../buttons/mainButton/MainButton";
import LogOut from "../buttons/logOut/LogOut";
import "./userHomeProfile.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import usePut from "../../hooks/usePut";
import { UPDATE_PROFILE_AVATAR, UPDATE_PROFILE_NAME, USER_PROFILE } from "../../config";

const UserHomeProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const { authToken } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);

  const { data, loading, error } = useFetch(
    USER_PROFILE,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    !!authToken
  );

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setProfileImage(data.avatarUrl);
    }
  }, [data]);

  const {
    executePut,
    loading: avatarPutLoading,
    error: avatarPutError,
  } = usePut(UPDATE_PROFILE_AVATAR);

  const {
    executePut: updateName,
    loading: namePutLoading,
    error: namePutError,
  } = usePut(UPDATE_PROFILE_NAME);

  const handleImageUpload = (imageUrl) => {
    executePut({ avatarUrl: imageUrl });
    setProfileImage(imageUrl);
  };

  const handleNameClick = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSaveChanges = () => {
    updateName({ name });
    setIsEditingName(false);
  };

  if (loading || avatarPutLoading || namePutLoading)
    return <div>Loading...</div>;
  if (error || avatarPutError || namePutError)
    return <div>Error: {error || avatarPutError || namePutError}</div>;

  return (
    <section className="userProfileContainer">
      <ProfileImg
        profileImage={profileImage}
        onImageUpload={handleImageUpload}
      />
      <div className="inputsContainer">
        <Input
          type="text"
          value={name}
          placeholder="Username"
          size="size"
          border="border"
          icon="../../../public/assets/icons/Edit only pencil.svg"
          pencil="pencil"
          onClick={handleNameClick}
          onChange={handleNameChange}
          readOnly={!isEditingName}
        />
        <Input type="email" defaultValue={email} placeholder="Email" readOnly />
        <Input type="password" placeholder="********" />
      </div>
      <div className="buttonsContainer">
        <MainButton
          color="accent"
          text="Guardar cambios"
          onClick={handleSaveChanges}
        />
      </div>
      <LogOut />
    </section>
  );
};

export default UserHomeProfile;

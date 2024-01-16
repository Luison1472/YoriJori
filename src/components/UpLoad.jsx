import React from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

class MyUploadAdapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadURL: null,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const file = await this.props.loader.file;
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('User not authenticated.');
      }

      const storageRef = ref(storage, `uploads/${user.uid}/${file.name}`);
      const uploadTask = await uploadBytes(storageRef, file);

      uploadTask.on('state_changed', null, (error) => {
        this.setState({ error });
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.setState({ downloadURL });
        });
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { downloadURL, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div>
        {downloadURL && <img src={downloadURL} alt="Uploaded" />}
        {/* Additional rendering logic can be added here */}
      </div>
    );
  }
}

export default MyUploadAdapter;
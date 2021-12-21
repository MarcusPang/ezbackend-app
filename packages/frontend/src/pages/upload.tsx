import { NextPage } from 'next';
import { FormEventHandler, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import PostFooter from '../components/Timeline/Footer';
import useAuth from '../hooks/useAuth';
import customFetch from '../libs/customFetch';
import formatGoogleUsername from '../utils/formatGoogleUsername';

const Upload: NextPage = () => {
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [valid, setValid] = useState(false);
  const { user } = useAuth();

  // simple check to make sure the url and caption are valid
  useEffect(() => {
    if (url && caption) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [caption, url, valid]);

  const uploadFormHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (valid) {
      const result = await customFetch.post('/post', {
        posterId: user?.id,
        caption,
        imageUrl: url,
        dateCreated: new Date(),
        archived: false,
      });
      return {
        success: !!result.id,
      };
    }
  };

  // using <img> as <Image> component in Next can only render
  // domains included in config
  const ImageRendered = () => {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={url}
        className="object-cover w-full max-h-[400px]"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '';
          setValid(false);
        }}
      />
    );
  };

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg container col-span-2 bg-base-200 shadow-lg mb-12">
          <div className="h-[480px]  object-cover">
            {url ? (
              <>
                <ImageRendered />
                <PostFooter
                  username={(user && formatGoogleUsername(user)) || ''}
                  caption={caption}
                />
              </>
            ) : (
              <div className="h-full flex place-content-center place-items-center">
                <span className="font-bold">No Image Selected</span>
              </div>
            )}
          </div>
        </div>
        <div className="rounded-lg container col-span-1 bg-base-200 mb-12">
          <form
            className="form-control p-10 mx-auto"
            onSubmit={uploadFormHandler}
          >
            <label htmlFor="url" className="label">
              Image URL
            </label>
            <input
              id="url"
              type="text"
              className="input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <label htmlFor="caption" className="label">
              Enter caption
            </label>
            <textarea
              id="caption"
              className="textarea"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <button type="submit" className={'btn btn-primary mt-4'}>
              Upload
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;

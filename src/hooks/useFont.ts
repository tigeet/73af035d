import { cloud } from "fb";
import { getDownloadURL, ref } from "firebase/storage";
import { useAppDispatch } from "hooks";
import { useEffect } from "react";
import { del, use } from "slices/load";

type UseFontProps = {
  name: string;
  content_id: string;
};
const useFont = ({ name, content_id }: UseFontProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function run() {
      const url = await getDownloadURL(ref(cloud, `fonts/${content_id}`));
      dispatch(use({ name, url }));
    }

    run();
    return () => dispatch(del(name)) as unknown as void;
  }, [content_id, dispatch, name]);
};

export default useFont;

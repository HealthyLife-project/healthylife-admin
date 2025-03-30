import { MainMenu } from "./mainstyled";

export const AdminMenu = ({
  MenuClick,
}: {
  MenuClick: (menu: string) => void;
}) => {
  return (
    <>
      <MainMenu>
        <ul>
          <li
            onClick={() => {
              MenuClick("category");
            }}
          >
            카테고리, 해쉬태그 관리
          </li>
          <li
            onClick={() => {
              MenuClick("iplog");
            }}
          >
            ip 로그
          </li>
        </ul>
      </MainMenu>
    </>
  );
};

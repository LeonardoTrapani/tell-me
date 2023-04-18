import { getServerSession } from "next-auth/next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { UTellMeComponentButton } from "~/components/UTellMeComponent";

import { type GetServerSidePropsContext } from "next/types";
import { authOptions } from "~/server/auth";
import { signOut, useSession } from "next-auth/react";
import { AvatarContent } from "~/components/Avatar";
import { BiCheck, BiEdit, BiEditAlt, BiLogOut, BiPencil } from "react-icons/bi";
import Input from "~/components/Input";
import LoadingIndicator from "~/components/LoadingIndicator";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/auth/signin" } };
  }
  return {
    props: {}
  };
}

const IndexSettings = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [hasUpdatedUsername, setHasUpdatedUsername] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [usernameInitialLength, setUsernameInitialLength] = useState<number | undefined>(undefined);
  const { data, status } = useSession();

  useEffect(() => {
    if (data?.user.name && !hasUpdatedUsername) {
      setUsernameValue(data.user.name);
      setHasUpdatedUsername(true);
      setUsernameInitialLength(data.user.name.length);
    }
  }, [data?.user.name, hasUpdatedUsername]);

  const usernameInputId = "username-input";
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="uTellMe settings" />
      </Head>
      {
        status === "loading" ?
          <div className="flex justify-center items-center h-screen">
            <LoadingIndicator />
          </div> :

          <div className="max-w-3xl m-auto p-2">
            <div className="flex items-center">
              <UTellMeComponentButton />
              <h1 className="text-3xl font-bold">Settings</h1>
            </div>
            <div className="divider my-1" />
            <div className="flex flex-col items-start">
              <h2 className="text-2xl font-bold mb-2">Account & Sign-in</h2>
              <div className="flex items-center gap-4 mb-4 w-full">
                <AvatarContent isBig sessionData={data} />
                {
                  data?.user.name &&
                  <div className="flex flex-col grow">
                    <div className="flex items-center">
                      {
                        isEditingUsername ?
                          <Input
                            id={usernameInputId}
                            name="username"
                            labelDisabled
                            onChange={(value) => {
                              setUsernameValue(value)
                            }}
                            placeholder="Username"
                            value={usernameValue}
                            borderHidden
                            initialLength={usernameInitialLength}
                            inputClassName="text-lg font-semibold h-min w-min"
                            maxLength={50}
                            onSubmit={() => {
                              //
                            }}
                            isGhost
                          /> : <p className="text-lg font-semibold">{data.user.name}</p>
                      }
                      {
                        isEditingUsername ?
                          <a className={`${usernameValue.length ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                            <BiCheck size={22} className={usernameValue.length > 0 ? "text-success" : ""} />
                          </a>
                          :
                          <a className="cursor-pointer ml-1" onClick={() => {
                            setIsEditingUsername(true);
                            setTimeout(() => {
                              const input = document.getElementById(usernameInputId) as HTMLInputElement | null;
                              if (input) input.focus();
                            }, 100)
                          }}>
                            <BiPencil size={20} />
                          </a>
                      }
                    </div>
                    <p className="">{data.user.email}</p>
                  </div>
                }
                <a onClick={() => {
                  void signOut();
                }} className="flex justify-between btn justify-self-end ml-auto">
                  <p>
                    Sign Out
                  </p>
                  <BiLogOut size={20} />
                </a>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default IndexSettings;

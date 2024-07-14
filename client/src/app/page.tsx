"use client";
import { useEffect, useState } from "react";
import Dropdown from "@/components/dropdown";
import Skeleton from "react-loading-skeleton";
import { Navbar } from "@/app/page_components/navbar";
import { Report } from "@/app/page_components/report";
import { getReport } from "@/lib/db/db";
import { TimePeriod, userReport, User } from "@/lib/types/core.types";

import { getAllUsersUnderUsername, getUserByUsername } from "@/lib/db/pg";

const authenticatedUsername = "grote";

export default function MergeRequestAssessment() {
  const [period, setPeriod] = useState<TimePeriod>("month");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
  const [data, setData] = useState<userReport | null>(null);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const periodDropdownOptions: { value: TimePeriod; label: string }[] = [
    { value: "month", label: "last 4 months" },
    { value: "week", label: "last 6 weeks" },
    { value: "quarter", label: "last 2 quarters" },
  ];

  useEffect(() => {
    if (authenticatedUser === null) {
      setLoading(true);
      getUserByUsername(authenticatedUsername)
        .then((result) => {
          setAuthenticatedUser(result);
          getAllUsersUnderUsername(authenticatedUsername)
            .then((result) => {
              setTeamMembers(result);
              setSelectedUser(result[0].username);
              setLoading(false);
              return;
            })
            .catch((e) => {
              console.error(e);
              setLoading(false);
              return;
            });
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
          return;
        });
    }
    if (selectedUser === null) {
      setData(null);
      return;
    }
    setLoading(true);
    getReport(selectedUser, period)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [selectedUser, period, authenticatedUser]);

  return (
    <main className="pt-24 flex flex-col justify-center items-center">
      {authenticatedUser ? (
        <Navbar
          onUserSelect={(user: string) => {
            setSelectedUser(user);
            setData(null);
          }}
          username={authenticatedUser.username}
          name={authenticatedUser.name}
          profilePic={authenticatedUser.profile_pic_url}
          teamMembers={teamMembers.map((member) => ({
            name: member.name,
            username: member.username,
          }))}
          className="fixed top-12 left-0 right-0 z-50 bg-white shadow-md"
        />
      ) : (
        <Skeleton height={40} className="w-full" />
      )}
      {loading ? (
        <Skeleton containerClassName="flex-1 mx-8 my-2 w-1/2" height={40} />
      ) : (
        selectedUser && (
          <Dropdown
            label="Period"
            onChange={(val: string) => setPeriod(val as TimePeriod)}
            defaultValue={period}
            options={periodDropdownOptions}
            className="flex-1 mx-8 my-2"
          />
        )
      )}

      {data === undefined ? (
        <p>Report is not available yet. Please try again</p>
      ) : (
        data && <Report data={data} period={period} />
      )}
    </main>
  );
}

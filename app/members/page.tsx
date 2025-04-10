import React from "react";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";
import { fetchCurrentUserLikeIds } from "../actions/likeAction";
import PaginationComponent from "@/components/PaginationComponent";
import { GetMemberParamss, UserFilters } from "@/types";
import EmptyState from "@/components/EmptyState";

const MemberPage = async ({
  searchParams,
}: {
  searchParams: Promise<GetMemberParamss>;
}) => {
  const params = await searchParams;
  const { items: members, totalCount} = await getMembers(params);
  const likeIds = await fetchCurrentUserLikeIds();
  return (
    <>
      {!members || members.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {" "}
          <div
            className="mt-10 grid grid-cols-2 md:grid-cols-2 
    lg:grid-cols-3 xl:grid-cols-6 gap-8"
          >
            {members &&
              members.map((member) => (
                <MemberCard key={member.id} member={member} likeIds={likeIds} />
              ))}
          </div>
          <PaginationComponent totalCount={totalCount} />
        </>
      )}
    </>
  );
};

export default MemberPage;

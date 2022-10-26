import React from "react";
import styled from "@emotion/styled";
import useLatestMovie  from "./useLatestMovie";
import Card from "../../../components/card";

const Base = styled.div``;

const LatestMovieSection: React.FC = () => {
    const { data, isLoading } = useLatestMovie()
    return (
        <Base>
            {
                isLoading ? 
                    <div>Loading...</div> : 
                    data?.data.map((item: any) => {
                        return <Card key={item[0]} id={item[0]} title={item[1]} />
                    })
            }
        </Base>
    )
}

export default LatestMovieSection
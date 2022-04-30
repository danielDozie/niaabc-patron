import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from "@remix-run/react";
import axios from 'axios';
import _ from 'lodash';
import { Architects } from '../../components/pages/architects/Architects';
import { Members } from 'Types';



export async function Members(): Promise<Members> {
    const { data } = await axios.get(process.env.API_URL + '/users');
    return data
}

export const loader: LoaderFunction = async () => {
    const response = await Members()
    return response
};

export default function index(): JSX.Element {
    const data: Members = useLoaderData()
    
    let init = 0
    let end = 44
    const countMembers = _.size(data)
    const sortedMembers = _.sortBy(data, ['dmn'])
    const members = _.slice(sortedMembers, init, end)
    return (
        <Architects members={members} countMembers={countMembers} />
    )
}

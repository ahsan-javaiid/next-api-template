
import { NextResponse } from "next/server";
import cors from '../../../lib/cors';
import { createPublicClient, http, formatEther } from 'viem'
import { rootstock } from 'viem/chains';
import { isValidAddress } from '../../../lib/utils';


// https://viem.sh/docs/getting-started

const rpc = process.env.RPC_API || 'https://public-node.rsk.co';

const publicClient = createPublicClient({ 
  chain: rootstock,
  transport: http(rpc)
})

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const GET = async (req: any, context: any) => { 

  const { params } = context;

  if(!isValidAddress(params.id)) {
    return NextResponse.json({
      msg: 'Address is not valid!'
    }, { status: 200, headers: corsHeaders });
  }
  
  const [balance] = await Promise.all([
    publicClient.getBalance({
      address: params.id
    }),
    // test more calls
  ]);

  const balanceAsEther = formatEther(balance);

  return NextResponse.json({
    data: {
      status: 'success',
      balance: balanceAsEther,

    }
  }, { status: 200, headers: corsHeaders });
}

export async function OPTIONS(request: Request) {
  return cors(
    request,
    new Response(null, {
      status: 204,
    })
  );
}
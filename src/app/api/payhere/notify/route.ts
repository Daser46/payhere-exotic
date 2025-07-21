import { NextRequest, NextResponse } from 'next/server';
import md5 from 'crypto-js/md5';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const merchant_id = formData.get('merchant_id')?.toString() || '';
        const order_id = formData.get('order_id')?.toString() || '';
        const payhere_amount = formData.get('payhere_amount')?.toString() || '';
        const payhere_currency = formData.get('payhere_currency')?.toString() || '';
        const status_code = formData.get('status_code')?.toString() || '';
        const received_md5sig = formData.get('md5sig')?.toString() || '';

        const merchant_secret = process.env.NEXT_PAYHERE_SECRET || '';

        const local_md5sig = md5(
            merchant_id +
            order_id +
            payhere_amount +
            payhere_currency +
            status_code +
            md5(merchant_secret).toString().toUpperCase()
        ).toString().toUpperCase();

        if (local_md5sig == received_md5sig && status_code === '2') {
            const { error } = await supabase
                .from('orders')
                .update({ status: 'paid' })
                .eq('id', order_id);

            if (error) {
                console.error("Supabase DB update error:", error);
                return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
            }

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ message: 'Payment not successful' });
        }

    } catch (err) {
        console.error("Error processing PayHere notify:", err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

import Layout from '@/components/Layout'
import React from 'react'
import withAuth from '@/hoc/withAuth';

const Dashboard = () => {
    return (
        <>
            <Layout>
                <div className='container'>
                    <div className='m-3'></div>
                    <h1>Dashboard & Profile</h1>
                    <div className='m-4'></div>
                    <div className='row'>
                        <div className='col-12'>
                            <h5>ยินดีต้อนรับ: นาย สมชาย ใจดี</h5>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default withAuth(Dashboard)
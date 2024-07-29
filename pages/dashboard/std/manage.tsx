import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { getDataById, postData, putData } from "@/pages/api/callApi";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

const CreateSTD = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState(null) as any;
    const {
        id,
        mode
    } = router.query;

    const fetchData = async () => {
        try {
            const data = await getDataById('std', id as string);
            console.log(`data`, data);
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (mode === 'edit' && id) {
            console.log('edit mode');
            console.log(id);
            fetchData();
        }
        if (mode === 'add') {
            console.log('add mode');
            setData({
                result: {
                    peaCode: '',
                    description: '',
                    unit: '',
                    price: ''
                }
            });
            setIsLoading(false);
        }
    }, []);

    return (
        <Layout>
            {isLoading && <Loading />}
            {!isLoading && <div>
                <h1>
                    {mode === 'edit' ? 'Edit' : 'Create'} STD
                </h1>
                <div className='m-4'></div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">PEA Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={data?.result?.peaCode}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    result: {
                                                        ...data.result,
                                                        peaCode: e.target.value
                                                    }
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            rows={3}
                                            value={data?.result?.description}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    result: {
                                                        ...data.result,
                                                        description: e.target.value
                                                    }
                                                });
                                            }}
                                        >
                                        </textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Unit</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={data?.result?.unit}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    result: {
                                                        ...data.result,
                                                        unit: e.target.value
                                                    }
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Price</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={data?.result?.price}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    result: {
                                                        ...data.result,
                                                        price: e.target.value
                                                    }
                                                });
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={async () => {
                                            if (data.result.peaCode === '' || data.result.description === '' || data.result.unit === '' || data.result.price === '') {
                                                alert('Please fill all required fields');
                                                return;
                                            }
                                            if (mode === 'edit') {
                                                try {
                                                    await putData('std', id as string, data.result);
                                                    router.push('/dashboard/std');
                                                } catch (error: any) {
                                                    let err = error;
                                                    if (error.response) {
                                                        err = `[${error.response.status}] ${error.response.data.msg}`;
                                                    }
                                                    alert(err);
                                                    router.push('/dashboard/std');
                                                }
                                            }
                                            if (mode === 'add') {
                                                try {
                                                    await postData('std', data.result);
                                                    router.push('/dashboard/std');
                                                } catch (error: any) {
                                                    let err = error;
                                                    if (error.response) {
                                                        err = `[${error.response.status}] ${error.response.data.msg}`;
                                                    }
                                                    alert(err);
                                                    router.push('/dashboard/std');
                                                }
                                            }
                                        }}
                                    >
                                        {mode === 'edit' ? 'Update' : 'Add'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </Layout>
    );
}

export default CreateSTD;
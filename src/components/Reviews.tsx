import { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '@/lib/supabase';

const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg
        className={`h-5 w-5 ${filled ? 'text-yellow-600' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.19a1 1 0 00.95.69h4.4c.969 0 1.371 1.24.588 1.81l-3.567 2.59a1 1 0 00-.364 1.118l1.357 4.19c.3.921-.755 1.688-1.54 1.118l-3.567-2.59a1 1 0 00-1.176 0l-3.567 2.59c-.785.57-1.84-.197-1.54-1.118l1.357-4.19a1 1 0 00-.364-1.118L2.204 9.617c-.783-.57-.38-1.81.588-1.81h4.4a1 1 0 00.95-.69l1.357-4.19z" />
    </svg>
);

const ReviewItem = ({ review }: { review: any }) => (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <p className="text-gray-700 text-lg leading-relaxed mb-4">{review?.comment}</p>
        <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-500 font-semibold">{review?.author?.[0]}</span>
            </div>
            <p className="ml-3 font-medium text-gray-800">- {review?.author}</p>
        </div>
    </div>
);

export default function ReviewSection({ props }: { props: { itemName: string, itemID: number, reviews: number, count: number, comments: any[] } }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAllReviewsModal, setIsAllReviewsModal] = useState(false);
    const [rating, setRating] = useState(3);
    const [reviews, setReviews] = useState(props.comments);
    const [loading, isLoading] = useState(false);
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');
    const [success, setSuccess] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleAllReviewsModal = () => {
        setIsAllReviewsModal(!isAllReviewsModal);
    };

    const fetchPreviousReviews = async () => {
        const { data } = await supabase.from('products').select('comments').eq('id', props.itemID).single();
        if (data && data.comments) {
            setReviews(data.comments);
            return data.comments; 
        }
        return []
    }

    const addReviews = async () => {
        isLoading(true);
        const updatedReviews = [...reviews, { author: author, comment: comment }];
        setReviews(updatedReviews);
        const { data, error } = await supabase.from('products').update({ comments: updatedReviews, review_avg: (props.reviews + rating) / (props.count + 1), reviews: props.count + 1 }).eq('id', props.itemID).select();
        if (data) {
            isLoading(false);
            setAuthor('');
            setRating(3);
            setComment('');
            setSuccess(true);
            toggleModal();
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
        } else if (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPreviousReviews()
    }, [])

    return (
        <>
            <Head>
                <title>Product Reviews</title>
            </Head>

            {success && (
                <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-4 z-50">
                    Review has been added successfully!
                </div>
            )}

            <section className="bg-white py-12 antialiased lg:py-20">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                            <h2 className="text-3xl font-bold text-gray-900">Reviews</h2>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {[...Array(Math.ceil(props.reviews))].map((_, i) => (
                                        <StarIcon key={i} filled />
                                    ))}
                                </div>
                                <p className="text-lg font-medium text-gray-600">{'(' + Math.ceil(props.reviews) + ')'}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={toggleModal}
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 transition duration-300"
                            >
                                Write a review
                            </button>
                            {reviews.length > 6 && (
                                <button
                                    onClick={toggleAllReviewsModal}
                                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-yellow-500 border-2 border-yellow-600 rounded-lg hover:bg-yellow-50 transition duration-300"
                                >
                                    View All Reviews
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-bold text-gray-900">{Math.ceil(props.reviews)}</span>
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} filled={i < Math.ceil(props.reviews)} />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{props.count} total reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {reviews.slice(0,6).map((review, index) => (
                            <ReviewItem key={index} review={review} />
                        ))}
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div
                    onClick={(e) => e.target === e.currentTarget && toggleModal()}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                >
                    <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-xl">
                        <div className="flex justify-between items-center border-b pb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Add a review</h3>
                                <p className="text-lg text-yellow-600 mt-1">{props.itemName}</p>
                            </div>
                            <button onClick={toggleModal} className="text-gray-400 hover:text-gray-900 text-2xl">
                                ✕
                            </button>
                        </div>

                        <form className="mt-6 space-y-6" onSubmit={e => { e.preventDefault(); addReviews() }}>
                            <div>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none transform hover:scale-110 transition-transform">
                                            <StarIcon filled={rating >= star} />
                                        </button>
                                    ))}
                                    <span className="ml-3 text-xl font-bold text-gray-900">{rating} out of 5</span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                                <input
                                    id="title"
                                    type="text"
                                    required
                                    value={author}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-200"
                                    onChange={(e) => { setAuthor(e.target.value) }}
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Your Review</label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    required
                                    value={comment}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-200"
                                    onChange={(e) => { setComment(e.target.value) }}
                                ></textarea>
                            </div>
                            {loading && (
                                <div className="text-yellow-600 text-center py-2 bg-yellow-50 rounded-lg">
                                    Please wait while we process your review...
                                </div>
                            )}
                            <button 
                                type="submit" 
                                disabled={loading} 
                                className="w-full py-3 px-6 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 transition duration-300 disabled:opacity-50"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isAllReviewsModal && (
                <div
                    onClick={(e) => e.target === e.currentTarget && toggleAllReviewsModal()}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                >
                    <div className="w-full max-w-4xl h-[80vh] overflow-y-auto rounded-xl bg-white p-8 shadow-xl">
                        <div className="flex justify-between items-center border-b pb-4 mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">All Reviews</h3>
                            <button onClick={toggleAllReviewsModal} className="text-gray-400 hover:text-gray-900 text-2xl">
                                ✕
                            </button>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {reviews.map((review, index) => (
                                <ReviewItem key={index} review={review} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
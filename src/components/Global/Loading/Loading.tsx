import LaodingImg from '../../../assets/loadin_img.svg';

const Loading = () => {
  return (
    <div className='bg-mainColor w-full h-screen flex justify-center items-center'>
        <img src={LaodingImg} alt='LaodingImg' className='animate-spin-slow'/>
    </div>
  )
}

export default Loading